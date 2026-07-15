import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { getLenis } from './useLenis'

/**
 * Scroll-driven service stack: one sticky panel pin; cards are absolute and
 * move with translateY from Lenis/window scroll. No per-card sticky.
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

  let resizeObserver = null
  let removeLenisScroll = null
  let peekH = 96
  let stageH = 480
  let stickyTopCache = 120
  let measureTimer = 0

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

  function ensureMotion(n) {
    if (cardMotion.value.length === n) return
    cardMotion.value = Array.from({ length: n }, (_, i) => ({
      transform: i === 0 ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
      zIndex: i + 1,
      collapsed: false,
    }))
  }

  function measure() {
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
      const num = card.querySelector('.service-row-top')
      const inner = card.querySelector('.service-card-inner')
      if (!title || !inner) return
      const padTop = parseFloat(getComputedStyle(inner).paddingTop) || 0
      const numH = num ? num.getBoundingClientRect().height : 0
      const titleH = title.getBoundingClientRect().height
      // Extra slack so descenders (g, j, p) aren't clipped by the next card
      const peek = padTop + numH + titleH + 16
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

    applyScroll()
    getLenis()?.resize()
  }

  function applyScroll(scrollOverride) {
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
    const y = typeof e?.scroll === 'number' ? e.scroll : getScrollY()
    applyScroll(y)
  }

  function debouncedMeasure() {
    clearTimeout(measureTimer)
    measureTimer = window.setTimeout(() => measure(), 80)
  }

  onMounted(async () => {
    await nextTick()
    ensureMotion(getCount())
    measure()

    window.addEventListener('resize', debouncedMeasure, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    const lenis = getLenis()
    if (lenis?.on) {
      lenis.on('scroll', onScroll)
      removeLenisScroll = () => lenis.off?.('scroll', onScroll)
    }

    if (typeof ResizeObserver !== 'undefined' && listRef.value) {
      resizeObserver = new ResizeObserver(debouncedMeasure)
      resizeObserver.observe(listRef.value)
    }
  })

  onUnmounted(() => {
    clearTimeout(measureTimer)
    window.removeEventListener('resize', debouncedMeasure)
    window.removeEventListener('scroll', onScroll)
    removeLenisScroll?.()
    resizeObserver?.disconnect()
  })

  watch(
    () => getCount(),
    async () => {
      await nextTick()
      measure()
    },
  )

  return { trackRef, panelRef, stageRef, listRef, cardMotion }
}
