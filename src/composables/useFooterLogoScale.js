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
  const alignShift = ref(0)
  const alignOverflow = ref(0)

  let resizeObserver = null

  function updateAlign() {
    const wrap = wrapRef.value
    const logo = logoRef.value
    if (!wrap || !logo) return

    if (!isScrollSparkleVisible()) {
      alignShift.value = 0
      alignOverflow.value = 0
      return
    }

    const width = wrap.clientWidth
    if (width <= 0) return

    const trim = readTrimRatio()
    const xOffset = readCssNumber('--footer-logo-x-offset', 0)
    // Hang transparent PNG padding past the right edge so the glyph aligns with the sparkle.
    const shift = Math.max(0, width * trim - xOffset)

    alignShift.value = shift

    const axis = readScrollSparkleAxisPx()
    alignOverflow.value = Math.max(0, shift - axis + 6)
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

  return { wrapRef, logoRef, alignShift, alignOverflow }
}
