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
  starfieldTextExclusion: [
    { x: 9, y: 31, width: 38, height: 34, pad: 0.7 },
  ],
  preserveAspectRatio: 'xMidYMid slice',
  constellation: {
    clip: { x: 47, y: 32, width: 53, height: 36 },
    tx: 54,
    ty: 30,
    scale: 1.53,
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
  starfieldTextExclusion: [
    { x: 10, y: 10, width: 80, height: 54, pad: 1.8 },
  ],
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
  starCount: 230,
  starSeed: 91427,
  yMax: 99,
  ySpawnMin: 2,
  ySpawnMax: 96,
  yUniform: true,
  yBands: [
    { share: 0.18, ySpawnMin: 1.5, ySpawnMax: 14 },
    { share: 0.18, ySpawnMin: 14, ySpawnMax: 30 },
    { share: 0.32, ySpawnMin: 30, ySpawnMax: 66 },
    { share: 0.32, ySpawnMin: 66, ySpawnMax: 98 },
  ],
  minSpacing: 1.55,
  constellationClearance: 4.2,
  constellationLineClearance: 1.6,
  constellationInteriorClearance: 2.0,
  constellationLineGlowPx: 7,
  /* Constellation is CSS-positioned in a separate band; don't clear mid-sky. */
  starfieldIgnoreConstellation: true,
  starfieldSizeScale: 0.561,
  glowShare: 0.075,
  sparkleShare: 0.035,
  starfieldClip: { x: 0, y: 0, width: 100, height: 99 },
  starfieldTextExclusion: [],
  preserveAspectRatio: 'xMidYMin meet',
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

function scaleStarfieldRect(rect, scaleY) {
  return {
    ...rect,
    y: +(rect.y * scaleY).toFixed(2),
    height: +(rect.height * scaleY).toFixed(2),
  }
}

function scaleStarfieldBand(band, scaleY) {
  return {
    ...band,
    ySpawnMin: +(band.ySpawnMin * scaleY).toFixed(2),
    ySpawnMax: +(band.ySpawnMax * scaleY).toFixed(2),
  }
}

function fitMobileStarfield(layout, viewportWidth, viewportHeight) {
  const viewBoxHeight = Math.max(
    100,
    Math.min(240, (100 * viewportHeight) / Math.max(1, viewportWidth)),
  )
  const scaleY = viewBoxHeight / 100

  return {
    ...layout,
    starfieldViewBoxHeight: +viewBoxHeight.toFixed(2),
    yMax: +(layout.yMax * scaleY).toFixed(2),
    ySpawnMin: +(layout.ySpawnMin * scaleY).toFixed(2),
    ySpawnMax: +(layout.ySpawnMax * scaleY).toFixed(2),
    starfieldClip: scaleStarfieldRect(layout.starfieldClip, scaleY),
    starfieldTextExclusion: layout.starfieldTextExclusion.map((rect) =>
      scaleStarfieldRect(rect, scaleY),
    ),
    yBands: layout.yBands?.map((band) => scaleStarfieldBand(band, scaleY)),
  }
}

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
  if (viewportWidth <= 480) {
    return fitMobileStarfield(HERO_SKY_MOBILE, viewportWidth, viewportHeight)
  }
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
