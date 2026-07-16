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
  /** @type {import('vue').Ref<Array<{ transform: string, zIndex: number, collapsed: boolean }>>} */
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
    }))
  }

  function clearStackInlineStyles() {
    const track = trackRef.value
    const panel = panelRef.value
    const stage = stageRef.value
    track?.style.removeProperty('--services-track-h')
    panel?.style.removeProperty('--service-panel-header-h')
    panel?.style.removeProperty('--service-title-stack-h')
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

    let tallestPeek = 0
    cards.forEach((card) => {
      const title = card.querySelector('.service-title')
      const inner = card.querySelector('.service-card-inner')
      if (!title || !inner) return
      // Measure to the title box bottom (includes padding for descenders).
      // Keep slack tiny so tags below never peek into the stack gap.
      const peek =
        title.getBoundingClientRect().bottom - inner.getBoundingClientRect().top + 2
      if (peek > tallestPeek) tallestPeek = peek
    })
    if (tallestPeek > 40) peekH = Math.ceil(tallestPeek)

    const headerEl = panel.querySelector('.services-panel-header')
    const footerEl = panel.querySelector('.services-panel-footer')
    const headerH = headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 48
    const footerH = footerEl ? Math.ceil(footerEl.getBoundingClientRect().height) : 72

    panel.style.setProperty('--service-panel-header-h', `${headerH}px`)
    panel.style.setProperty('--service-title-stack-h', `${peekH}px`)

    stickyTopCache = readStickyTopPx(panel)
    const vh = window.innerHeight
    const available = vh - stickyTopCache - headerH - footerH - 12
    stageH = Math.max(320, Math.floor(available))
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
