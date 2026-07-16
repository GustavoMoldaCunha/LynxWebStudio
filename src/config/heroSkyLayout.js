export const HERO_SKY_DESKTOP = {
  id: 'desktop',
  starCount: 210,
  starSeed: 58219,
  yMax: 88,
  yDenseMax: 75,
  ySpawnMin: 0,
  ySpawnMax: 75,
  yDenseShare: 0.68,
  yDensePower: 0.72,
  yDenseSpan: 0.58,
  minSpacing: 1.65,
  glowShare: 0.14,
  sparkleShare: 0.12,
  constellationClearance: 1.5,
  constellationLineClearance: 0.55,
  constellationInteriorClearance: 0.85,
  starfieldClip: { x: 0, y: 0, width: 100, height: 88 },
  preserveAspectRatio: 'xMidYMid slice',
  constellation: {
    clip: { x: 47, y: 32, width: 53, height: 36 },
    tx: 58,
    ty: 30,
    scale: 2,
    starSizeScale: 1.5,
  },
}

export const HERO_SKY_TABLET = {
  id: 'tablet',
  starCount: 145,
  starSeed: 58219,
  yMax: 88,
  yDenseMax: 75,
  ySpawnMin: 0,
  ySpawnMax: 75,
  yDenseShare: 0.68,
  yDensePower: 0.72,
  yDenseSpan: 0.58,
  minSpacing: 1.8,
  glowShare: 0.12,
  sparkleShare: 0.05,
  sparkleGlowAllowed: false,
  sparkleArmMax: 0.42,
  sparkleGlowArmMax: 0.5,
  sparkleArmMaxPx: 5.5,
  constellationClearance: 2.8,
  constellationLineClearance: 1.15,
  constellationInteriorClearance: 1.5,
  constellationLineGlowPx: 7,
  /* Constellation is CSS-positioned in a separate band; don't clear mid-sky. */
  starfieldIgnoreConstellation: true,
  starfieldClip: { x: 0, y: 0, width: 100, height: 88 },
  preserveAspectRatio: 'xMidYMid slice',
  constellationPreserveAspectRatio: 'xMidYMid meet',
  constellationViewBox: { x: 32, y: 25, width: 38, height: 44 },
  constellation: {
    clip: { x: 32, y: 25, width: 38, height: 44 },
    tx: 37.9,
    ty: 34.5,
    scale: 1.38,
    starSizeScale: 1.45,
    starMinBoost: 1,
  },
}

export const HERO_SKY_MOBILE = {
  id: 'mobile',
  starCount: 155,
  starSeed: 91427,
  yMax: 99,
  ySpawnMin: 2,
  ySpawnMax: 88,
  yUniform: true,
  minSpacing: 2.15,
  constellationClearance: 4.2,
  constellationLineClearance: 1.6,
  constellationInteriorClearance: 2.0,
  constellationLineGlowPx: 7,
  /* Constellation is CSS-positioned in a separate band; don't clear mid-sky. */
  starfieldIgnoreConstellation: true,
  starfieldSizeScale: 0.561,
  glowShare: 0.08,
  sparkleShare: 0.05,
  starfieldClip: { x: 0, y: 0, width: 100, height: 99 },
  preserveAspectRatio: 'xMidYMid slice',
  constellationPreserveAspectRatio: 'xMidYMid meet',
  constellationViewBox: { x: 32, y: 25, width: 38, height: 44 },
  constellation: {
    clip: { x: 32, y: 25, width: 38, height: 44 },
    tx: 37.9,
    ty: 34.5,
    scale: 1.28,
    starSizeScale: 1.5,
    starMinBoost: 1,
  },
}

const DESKTOP_HEIGHT_REF = 920
const DESKTOP_HEIGHT_MIN = 600

function clamp01(value) {
  return Math.min(1, Math.max(0, value))
}

function lerp(from, to, t) {
  return from + (to - from) * t
}

function getVisibleViewBoxY(viewportWidth, viewportHeight) {
  const visibleHeight = (100 * viewportHeight) / Math.max(viewportWidth, viewportHeight)
  const minY = (100 - visibleHeight) / 2
  return {
    minY,
    maxY: minY + visibleHeight,
    height: visibleHeight,
  }
}

function screenPxToViewBoxY(px, viewportWidth, viewportHeight) {
  if (!px || viewportHeight <= 0) return 0
  const visibleHeight = (100 * viewportHeight) / Math.max(viewportWidth, viewportHeight)
  return (px / viewportHeight) * visibleHeight
}

function estimateConstellationGlowPx(viewportWidth) {
  const base = Math.min(22, Math.max(14, viewportWidth * 0.018))
  return base * 1.42
}

const CURSOR_LOCAL_MIN_X = 4
const CURSOR_LOCAL_MAX_X = 17
const CURSOR_LOCAL_WIDTH = CURSOR_LOCAL_MAX_X - CURSOR_LOCAL_MIN_X

function getHeroCopyRightFraction(viewportWidth) {
  const copyLeft = Math.min(180, Math.max(48, viewportWidth * 0.12))
  const copyWidth = Math.min(viewportWidth * 0.5, 600)
  const gapPx = Math.min(120, Math.max(72, viewportWidth * 0.055))
  return (copyLeft + copyWidth + gapPx) / viewportWidth
}

export function fitDesktopConstellation(
  constellation,
  viewportWidth,
  viewportHeight,
  navbarHeightPx = 88,
) {
  const { minY: visibleMinY, maxY: visibleMaxY } = getVisibleViewBoxY(viewportWidth, viewportHeight)

  const starGlowPx = estimateConstellationGlowPx(viewportWidth) * 1.4
  const topClearancePx = navbarHeightPx + starGlowPx + 16
  const safeTopY = visibleMinY + screenPxToViewBoxY(topClearancePx, viewportWidth, viewportHeight)

  const bottomMargin = 2
  const mountainCeiling = lerp(
    50,
    64,
    clamp01((viewportHeight - DESKTOP_HEIGHT_MIN) / (DESKTOP_HEIGHT_REF - DESKTOP_HEIGHT_MIN)),
  )
  const safeBottomY = Math.min(mountainCeiling, visibleMaxY - bottomMargin)

  const anchorY = 2.5
  const bottomLocalY = 21
  const localHeight = bottomLocalY - anchorY
  const available = Math.max(0, safeBottomY - safeTopY)
  const minScale = 1.05

  const copyRightX = getHeroCopyRightFraction(viewportWidth) * 100
  const rightMargin = 2.5
  const maxRightX = 100 - rightMargin
  const maxScaleFromWidth = (maxRightX - copyRightX) / CURSOR_LOCAL_WIDTH

  let scale = Math.min(constellation.scale, available / localHeight, maxScaleFromWidth)
  scale = Math.max(minScale, scale)

  let ty = constellation.ty

  if (ty + bottomLocalY * scale > safeBottomY) {
    ty = safeBottomY - bottomLocalY * scale
  }

  if (ty + anchorY * scale < safeTopY) {
    ty = safeTopY - anchorY * scale
  }

  const topY = ty + anchorY * scale
  const bottomY = ty + bottomLocalY * scale
  if (topY < safeTopY || bottomY > safeBottomY) {
    scale = Math.max(minScale, Math.min(available / localHeight, maxScaleFromWidth))
    ty = safeTopY + (available - localHeight * scale) / 2 - anchorY * scale
  }

  const minTx = copyRightX - CURSOR_LOCAL_MIN_X * scale
  const maxTx = maxRightX - CURSOR_LOCAL_MAX_X * scale
  let tx = constellation.tx

  if (minTx <= maxTx) {
    tx = minTx + (maxTx - minTx) * 0.68
  } else {
    tx = minTx
  }

  return {
    ...constellation,
    scale: +scale.toFixed(3),
    tx: +tx.toFixed(3),
    ty: +ty.toFixed(3),
    lineCompress: 1,
  }
}

export function getHeroSkyLayout(
  viewportWidth,
  viewportHeight = DESKTOP_HEIGHT_REF,
  navbarHeightPx = 88,
) {
  if (viewportWidth <= 480) return HERO_SKY_MOBILE
  if (viewportWidth <= 920) return HERO_SKY_TABLET

  return {
    ...HERO_SKY_DESKTOP,
    constellation: fitDesktopConstellation(
      HERO_SKY_DESKTOP.constellation,
      viewportWidth,
      viewportHeight,
      navbarHeightPx,
    ),
  }
}
