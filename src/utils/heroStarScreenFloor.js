import { DECO_SPARKLE_ARM } from '../config/decoSparkle.js'

function parsePx(value, fallback) {
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : fallback
}

/** Read minimum on-screen star radii from hero SVG CSS variables. */
export function readHeroStarFloorsPx(el, { variant = 'starfield' } = {}) {
  const style = getComputedStyle(el)
  const parentStyle = el.parentElement ? getComputedStyle(el.parentElement) : null

  function readVar(name, fallback) {
    const own = parsePx(style.getPropertyValue(name), NaN)
    if (Number.isFinite(own)) return own

    if (parentStyle) {
      const inherited = parsePx(parentStyle.getPropertyValue(name), NaN)
      if (Number.isFinite(inherited)) return inherited
    }

    return fallback
  }

  if (variant === 'constellation') {
    return {
      glow: readVar('--hero-constellation-star-min-radius', 14),
      sparkle: readVar('--hero-constellation-sparkle-min-radius', 8),
    }
  }

  return {
    core: readVar('--hero-star-min-radius', 2),
    glow: readVar('--hero-star-glow-min-radius', 3),
    sparkle: readVar('--hero-star-sparkle-min-arm', 5),
  }
}

/** SSR / pre-mount fallback matching heroStarMinRadius.css clamp() curves. */
export function fallbackMinPx(kind, viewportWidth) {
  const vw = viewportWidth || 1280

  if (kind === 'core') {
    const base = Math.min(4, Math.max(2, vw * 0.005))
    return vw <= 480 ? base * 0.55 : base
  }

  if (kind === 'glow') {
    const base = Math.min(8, Math.max(3, vw * 0.0085))
    return vw <= 480 ? base * 0.55 : base
  }

  if (kind === 'sparkle') {
    const base = Math.min(9, Math.max(5, vw * 0.0095))
    if (vw <= 480) return base * 0.6
    if (vw <= 920) return Math.min(4.8, base * 0.62)
    return base
  }

  if (kind === 'constellation') {
    if (vw <= 480) return 26
    return Math.min(22, Math.max(14, vw * 0.018))
  }

  if (kind === 'constellationSparkle') {
    if (vw <= 480) return 14
    return Math.min(12, Math.max(8, vw * 0.011))
  }

  return 2
}

/**
 * Bump an SVG radius so its rendered size is at least minPx on screen.
 */
export function flooredSvgRadius(r, minPx, svgWidthPx, viewBoxWidth) {
  if (!svgWidthPx || !viewBoxWidth) return r

  const pxPerUnit = svgWidthPx / viewBoxWidth
  const screenR = r * pxPerUnit

  if (screenR >= minPx) return r

  return minPx / pxPerUnit
}

/**
 * Raise starfield radii to on-screen minimums while preserving relative size variation.
 */
export function applyStarfieldFloors(
  stars,
  floors,
  svgWidthPx,
  viewBoxWidth,
  sizeScale = 1,
  caps = {},
) {
  if (!svgWidthPx || !viewBoxWidth || !stars.length) return stars

  const pxPerUnit = svgWidthPx / viewBoxWidth
  const coreStars = stars.filter((star) => !star.glow && !star.sparkle)
  const glowStars = stars.filter((star) => star.glow)
  const plainSparkles = stars.filter((star) => star.sparkle && !star.glow)

  let coreScale = 1
  if (coreStars.length) {
    const minCoreScreen = Math.min(...coreStars.map((star) => star.r * pxPerUnit))
    if (minCoreScreen < floors.core) {
      coreScale = floors.core / minCoreScreen
    }
  }

  let glowScale = 1
  if (glowStars.length) {
    const minGlowScreen = Math.min(...glowStars.map((star) => star.glowR * pxPerUnit))
    if (minGlowScreen < floors.glow) {
      glowScale = floors.glow / minGlowScreen
    }
  }

  let sparkleScale = 1
  if (plainSparkles.length) {
    const minSparkleScreen = Math.min(
      ...plainSparkles.map((star) => star.sparkleScale * DECO_SPARKLE_ARM * pxPerUnit),
    )
    if (minSparkleScreen < floors.sparkle) {
      sparkleScale = floors.sparkle / minSparkleScreen
    }
  }

  const scaled = stars.map((star) => ({
    ...star,
    r: star.sparkle ? star.r : +(star.r * coreScale * sizeScale).toFixed(3),
    glowR: star.glow ? +(star.glowR * glowScale * sizeScale).toFixed(3) : star.glowR,
    sparkleScale: star.sparkle
      ? +(
          star.sparkleScale *
          (star.glow ? glowScale : sparkleScale) *
          sizeScale
        ).toFixed(4)
      : star.sparkleScale,
  }))

  const maxArmPx = caps.sparkleArmMaxPx
  if (!maxArmPx) return scaled

  return scaled.map((star) => {
    if (!star.sparkle) return star

    const armPx = star.sparkleScale * DECO_SPARKLE_ARM * pxPerUnit
    if (armPx <= maxArmPx) return star

    const cappedScale = +(maxArmPx / (DECO_SPARKLE_ARM * pxPerUnit)).toFixed(4)

    return {
      ...star,
      sparkleScale: cappedScale,
      r: +(cappedScale * DECO_SPARKLE_ARM).toFixed(3),
    }
  })
}

/**
 * Bump a local SVG size so its on-screen size (after layoutScale) is at least minPx.
 */
export function flooredScreenSize(localSize, minPx, svgWidthPx, viewBoxWidth, layoutScale = 1) {
  if (!svgWidthPx || !viewBoxWidth || !layoutScale) return localSize

  const pxPerUnit = svgWidthPx / viewBoxWidth
  const screenSize = localSize * layoutScale * pxPerUnit

  if (screenSize >= minPx) return localSize

  return minPx / (layoutScale * pxPerUnit)
}
