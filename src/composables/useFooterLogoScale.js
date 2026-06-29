import { ref, onMounted, onUnmounted } from 'vue'

function readCssNumber(name, fallback = 0) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const value = parseFloat(raw)
  return Number.isFinite(value) ? value : fallback
}

function readTrimRatio() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--footer-logo-png-trim')
    .trim()

  if (raw.endsWith('%')) return parseFloat(raw) / 100
  return 0.125
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
  const scale = ref(1)
  const alignShift = ref(0)
  const alignOverflow = ref(0)

  let resizeObserver = null

  function readLogoHeightPx() {
    const logo = logoRef.value
    if (!logo) return 180

    const height = parseFloat(getComputedStyle(logo).height)
    return Number.isFinite(height) && height > 0 ? height : 180
  }

  function readIntrinsicLogoWidth() {
    const logo = logoRef.value
    if (!logo?.naturalWidth || !logo?.naturalHeight) return 0

    const heightPx = readLogoHeightPx()
    return (logo.naturalWidth / logo.naturalHeight) * heightPx
  }

  function updateScale() {
    const wrap = wrapRef.value
    const logo = logoRef.value
    if (!wrap || !logo) return

    const intrinsicWidth = readIntrinsicLogoWidth()
    if (intrinsicWidth <= 0) return

    const availableWidth = wrap.clientWidth
    if (availableWidth <= 0) return

    const nextScale = Math.min(1, availableWidth / intrinsicWidth)
    scale.value = nextScale

    if (!isScrollSparkleVisible()) {
      alignShift.value = 0
      alignOverflow.value = 0
      return
    }

    const scaledWidth = intrinsicWidth * nextScale
    const trim = readTrimRatio()
    const xOffset = readCssNumber('--footer-logo-x-offset', 0)
    const shift = Math.max(0, scaledWidth * trim - xOffset * nextScale)

    alignShift.value = shift

    const axis = readScrollSparkleAxisPx()
    alignOverflow.value = Math.max(0, shift - axis + 6)
  }

  function bindLogoLoad() {
    const logo = logoRef.value
    if (!logo) return

    if (logo.complete) {
      updateScale()
      return
    }

    logo.addEventListener('load', updateScale, { once: true })
  }

  onMounted(() => {
    bindLogoLoad()

    resizeObserver = new ResizeObserver(updateScale)
    if (wrapRef.value) resizeObserver.observe(wrapRef.value)

    window.addEventListener('resize', updateScale, { passive: true })
  })

  onUnmounted(() => {
    resizeObserver?.disconnect()
    window.removeEventListener('resize', updateScale)
  })

  return { wrapRef, logoRef, scale, alignShift, alignOverflow }
}
