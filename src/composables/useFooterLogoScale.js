import { ref, onMounted, onUnmounted } from 'vue'

function readCssNumber(name, fallback = 0) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const value = parseFloat(raw)
  return Number.isFinite(value) ? value : fallback
}

function readTrimRatio() {
  return readCssRatio('--footer-logo-png-trim', 0.125)
}

function readCssRatio(name, fallback) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()

  if (raw.endsWith('%')) return parseFloat(raw) / 100

  const value = parseFloat(raw)
  return Number.isFinite(value) ? value : fallback
}

function readScrollSparkleAxisPx() {
  const sparkle = document.querySelector('.scroll-sparkle')
  if (!sparkle || getComputedStyle(sparkle).display === 'none') {
    return readCssNumber('--section-pad-x', 48)
  }

  const rect = sparkle.getBoundingClientRect()
  return window.innerWidth - rect.left - rect.width / 2
}

function isScrollSparkleVisible() {
  const sparkle = document.querySelector('.scroll-sparkle')
  return Boolean(sparkle && getComputedStyle(sparkle).display !== 'none')
}

export function useFooterLogoScale() {
  const wrapRef = ref(null)
  const logoRef = ref(null)
  const alignShift = ref(0)
  const widthExtend = ref(0)
  const alignOverflow = ref(0)

  let resizeObserver = null

  function updateAlign() {
    const wrap = wrapRef.value
    const logo = logoRef.value
    if (!wrap || !logo) return

    if (!isScrollSparkleVisible()) {
      alignShift.value = 0
      widthExtend.value = 0
      alignOverflow.value = 0
      return
    }

    const width = wrap.clientWidth
    if (width <= 0) return

    const trim = readTrimRatio()
    const xOffset = readCssNumber('--footer-logo-x-offset', 0)
    const extend = Math.max(0, width * trim - xOffset)
    const axis = readScrollSparkleAxisPx()
    const starAnchor = readCssRatio('--footer-logo-star-anchor', 0.85868)
    const targetStarX = window.innerWidth - axis
    const currentStarX = wrap.getBoundingClientRect().left + (width + extend) * starAnchor

    widthExtend.value = extend
    alignShift.value = targetStarX - currentStarX
    alignOverflow.value = 0
  }

  function bindLogoLoad() {
    const logo = logoRef.value
    if (!logo) return

    if (logo.complete) {
      updateAlign()
      return
    }

    logo.addEventListener('load', updateAlign, { once: true })
  }

  onMounted(() => {
    bindLogoLoad()

    resizeObserver = new ResizeObserver(updateAlign)
    if (wrapRef.value) resizeObserver.observe(wrapRef.value)

    window.addEventListener('resize', updateAlign, { passive: true })
  })

  onUnmounted(() => {
    resizeObserver?.disconnect()
    window.removeEventListener('resize', updateAlign)
  })

  return { wrapRef, logoRef, alignShift, widthExtend, alignOverflow }
}
