import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { getLenis } from './useLenis'

const STATIC_MQ = '(max-width: 920px), (prefers-reduced-motion: reduce)'

/**
 * Scroll-driven service stack: one sticky panel pin; cards are absolute and
 * move with translateY from Lenis/window scroll. No per-card sticky.
 * Below 920px (or reduced-motion): static list — no pin / transforms.
 */
export function useServiceStackScroll(options = {}) {
  const getCount = options.getCount ?? (() => 1)
  const segmentVh = options.segmentVh ?? 0.72

  const trackRef = ref(null)
  const panelRef = ref(null)
  const stageRef = ref(null)
  const listRef = ref(null)
  /** @type {import('vue').Ref<Array<{ transform: string, zIndex: number, collapsed: boolean, stackOffset: string }>>} */
  const cardMotion = ref([])
  const isMobileStack = ref(false)

  let resizeObserver = null
  let removeLenisScroll = null
  let mediaQuery = null
  let peekH = 96
  let stageH = 480
  let stickyTopCache = 120
  let measureTimer = 0
  let scrollBound = false

  function getScrollY() {
    return window.scrollY || document.documentElement.scrollTop || getLenis()?.scroll || 0
  }

  function readStickyTopPx(panel) {
    const top = parseFloat(getComputedStyle(panel).top)
    return Number.isFinite(top) ? top : 120
  }

  function getDocTop(el) {
    return el.getBoundingClientRect().top + getScrollY()
  }

  function lerp(a, b, t) {
    return a + (b - a) * t
  }

  function readStaticMode() {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(STATIC_MQ).matches
  }

  function setNeutralMotion(n) {
    cardMotion.value = Array.from({ length: n }, (_, i) => ({
      transform: 'translate3d(0, 0, 0)',
      zIndex: i + 1,
      collapsed: false,
      stackOffset: '0px',
    }))
  }

  function ensureMotion(n) {
    if (isMobileStack.value) {
      setNeutralMotion(n)
      return
    }
    if (cardMotion.value.length === n) return
    cardMotion.value = Array.from({ length: n }, (_, i) => ({
      transform: i === 0 ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
      zIndex: i + 1,
      collapsed: false,
      stackOffset: `${i * peekH}px`,
    }))
  }

  function clearStackInlineStyles() {
    const track = trackRef.value
    const panel = panelRef.value
    const stage = stageRef.value
    track?.style.removeProperty('--services-track-h')
    panel?.style.removeProperty('--service-panel-header-h')
    panel?.style.removeProperty('--service-title-stack-h')
    panel?.style.removeProperty('--service-expand-mt')
    panel?.style.removeProperty('--service-detail-pt')
    panel?.style.removeProperty('--service-desc-mt')
    panel?.style.removeProperty('--service-title-scale')
    panel?.classList.remove('services-panel--compact')
    stage?.style.removeProperty('--services-stage-h')
  }

  function bindScroll() {
    if (scrollBound) return
    window.addEventListener('scroll', onScroll, { passive: true })
    const lenis = getLenis()
    if (lenis?.on) {
      lenis.on('scroll', onScroll)
      removeLenisScroll = () => lenis.off?.('scroll', onScroll)
    }
    scrollBound = true
  }

  function unbindScroll() {
    if (!scrollBound) return
    window.removeEventListener('scroll', onScroll)
    removeLenisScroll?.()
    removeLenisScroll = null
    scrollBound = false
  }

  function measureStatic() {
    const n = Math.max(1, getCount())
    setNeutralMotion(n)
    clearStackInlineStyles()
    unbindScroll()
    getLenis()?.resize()
  }

  function measureCardContentHeight(card) {
    const inner = card.querySelector('.service-card-inner')
    if (!inner) return 0

    const prevHeight = inner.style.height
    const prevMinHeight = inner.style.minHeight
    const prevOverflow = inner.style.overflow
    inner.style.height = 'auto'
    inner.style.minHeight = '0'
    inner.style.overflow = 'visible'
    const h = Math.ceil(inner.getBoundingClientRect().height)
    inner.style.height = prevHeight
    inner.style.minHeight = prevMinHeight
    inner.style.overflow = prevOverflow
    return h
  }

  function comfortableDescMargin(vh) {
    return Math.round(Math.min(180, Math.max(72, vh * 0.16)))
  }

  function applyTitleTextSpacing(panel, vh, overflowPx) {
    const descMax = comfortableDescMargin(vh)
    const descMin = 16
    const expandMax = 4
    const expandMin = 0
    const detailMax = 4
    const detailMin = 0

    let descMt = descMax
    let expandMt = expandMax
    let detailPt = detailMax
    let remaining = Math.max(0, overflowPx)

    if (remaining > 0) {
      const descCut = Math.min(descMax - descMin, remaining)
      descMt = descMax - descCut
      remaining -= descCut
    }
    if (remaining > 0) {
      const expandCut = Math.min(expandMax - expandMin, remaining)
      expandMt = expandMax - expandCut
      remaining -= expandCut
    }
    if (remaining > 0) {
      const detailCut = Math.min(detailMax - detailMin, remaining)
      detailPt = detailMax - detailCut
    }

    panel.style.setProperty('--service-expand-mt', `${expandMt}px`)
    panel.style.setProperty('--service-detail-pt', `${detailPt}px`)
    panel.style.setProperty('--service-desc-mt', `${descMt}px`)
    panel.classList.toggle('services-panel--compact', overflowPx > 0)
  }

  function measureStack() {
    const track = trackRef.value
    const panel = panelRef.value
    const stage = stageRef.value
    const list = listRef.value
    if (!track || !panel || !stage || !list) return

    const n = Math.max(1, getCount())
    ensureMotion(n)

    const cards = [...list.querySelectorAll('.service-card')]
    if (!cards.length) return

    const vh = window.innerHeight
    const minPeek = 96

    // 1) Comfortable spacing + natural peek height
    applyTitleTextSpacing(panel, vh, 0)
    panel.style.removeProperty('--service-title-scale')
    void panel.offsetHeight

    let naturalPeek = 0
    cards.forEach((card) => {
      const title = card.querySelector('.service-title')
      const inner = card.querySelector('.service-card-inner')
      if (!title || !inner) return
      const peek =
        title.getBoundingClientRect().bottom - inner.getBoundingClientRect().top + 2
      if (peek > naturalPeek) naturalPeek = peek
    })
    if (naturalPeek > 40) peekH = Math.ceil(naturalPeek)
    const comfortablePeekCap = Math.round(Math.min(peekH, Math.max(minPeek, vh * 0.128)))
    peekH = Math.min(peekH, comfortablePeekCap)

    const headerEl = panel.querySelector('.services-panel-header')
    const footerEl = panel.querySelector('.services-panel-footer')
    const headerH = headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 48
    const footerH = footerEl ? Math.ceil(footerEl.getBoundingClientRect().height) : 72

    panel.style.setProperty('--service-panel-header-h', `${headerH}px`)
    stickyTopCache = readStickyTopPx(panel)

    const viewportStage = Math.max(280, Math.floor(vh - stickyTopCache - headerH - footerH - 12))

    let tallestContent = 0
    cards.forEach((card) => {
      tallestContent = Math.max(tallestContent, measureCardContentHeight(card))
    })

    // 2) Shrink title↔text gaps as needed for the natural peek stack
    const roomWithNaturalPeek = viewportStage - (n - 1) * peekH
    applyTitleTextSpacing(panel, vh, tallestContent - roomWithNaturalPeek)
    void panel.offsetHeight

    tallestContent = 0
    cards.forEach((card) => {
      tallestContent = Math.max(tallestContent, measureCardContentHeight(card))
    })

    // 3) If still short on height, calculate a smaller peek so the last card fits
    if (n > 1) {
      const roomAfterSpacing = viewportStage - (n - 1) * peekH
      if (tallestContent + 12 > roomAfterSpacing) {
        const maxPeek = Math.floor((viewportStage - tallestContent - 8) / (n - 1))
        peekH = Math.max(minPeek, Math.min(peekH, maxPeek))
      }
    }

    // Scale collapsed titles slightly when peek is compressed below natural size
    const titleScale =
      naturalPeek > 0 ? Math.min(1, Math.max(0.62, peekH / naturalPeek)) : 1
    panel.style.setProperty('--service-title-scale', String(titleScale))
    panel.style.setProperty('--service-title-stack-h', `${peekH}px`)

    stageH = viewportStage
    stage.style.setProperty('--services-stage-h', `${stageH}px`)

    const segment = Math.max(Math.floor(vh * segmentVh), Math.floor(stageH * 0.9))
    const trackH = n * segment + Math.ceil(vh * 0.2)
    track.style.setProperty('--services-track-h', `${trackH}px`)

    bindScroll()
    applyScroll()
    getLenis()?.resize()
  }

  function measure() {
    const nextStatic = readStaticMode()
    isMobileStack.value = nextStatic

    if (nextStatic) {
      measureStatic()
      return
    }

    measureStack()
  }

  function applyScroll(scrollOverride) {
    if (isMobileStack.value) return

    const track = trackRef.value
    if (!track) return

    const n = Math.max(1, getCount())
    ensureMotion(n)

    const scrollY = scrollOverride ?? getScrollY()
    const pinStart = getDocTop(track) - stickyTopCache
    const pinDistance = Math.max(
      1,
      track.offsetHeight - (window.innerHeight - stickyTopCache),
    )
    const progress = Math.min(1, Math.max(0, (scrollY - pinStart) / pinDistance))
    const p = progress * n

    cardMotion.value = Array.from({ length: n }, (_, i) => {
      let y
      if (i === 0) {
        y = 0
      } else {
        const local = Math.min(1, Math.max(0, p - (i - 1)))
        y = lerp(stageH, i * peekH, local)
      }

      let collapsed = false
      if (i < n - 1) {
        const nextLocal = Math.min(1, Math.max(0, p - i))
        const nextY = lerp(stageH, (i + 1) * peekH, nextLocal)
        const bodyTop = i * peekH + peekH
        collapsed = nextY <= bodyTop + 10
      }

      return {
        transform: `translate3d(0, ${Math.round(y)}px, 0)`,
        zIndex: i + 1,
        collapsed,
        stackOffset: `${Math.round(i * peekH)}px`,
      }
    })
  }

  function onScroll(e) {
    if (isMobileStack.value) return
    const y = typeof e?.scroll === 'number' ? e.scroll : getScrollY()
    applyScroll(y)
  }

  function debouncedMeasure() {
    clearTimeout(measureTimer)
    measureTimer = window.setTimeout(() => measure(), 80)
  }

  function onMediaChange() {
    measure()
  }

  onMounted(async () => {
    await nextTick()
    isMobileStack.value = readStaticMode()
    ensureMotion(getCount())
    measure()

    window.addEventListener('resize', debouncedMeasure, { passive: true })

    if (typeof window !== 'undefined' && window.matchMedia) {
      mediaQuery = window.matchMedia(STATIC_MQ)
      mediaQuery.addEventListener?.('change', onMediaChange)
      mediaQuery.addListener?.(onMediaChange)
    }

    if (typeof ResizeObserver !== 'undefined' && listRef.value) {
      resizeObserver = new ResizeObserver(debouncedMeasure)
      resizeObserver.observe(listRef.value)
    }
  })

  onUnmounted(() => {
    clearTimeout(measureTimer)
    window.removeEventListener('resize', debouncedMeasure)
    unbindScroll()
    resizeObserver?.disconnect()
    mediaQuery?.removeEventListener?.('change', onMediaChange)
    mediaQuery?.removeListener?.(onMediaChange)
  })

  watch(
    () => getCount(),
    async () => {
      await nextTick()
      measure()
    },
  )

  return { trackRef, panelRef, stageRef, listRef, cardMotion, isMobileStack }
}
