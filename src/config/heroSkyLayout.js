/** Shared hero sky layout profiles (viewBox 0–100 coords). */
export const HERO_SKY_DESKTOP = {
  id: 'desktop',
  starCount: 210,
  starSeed: 58219,
  yMax: 60,
  yDenseMax: 50,
  minSpacing: 1.65,
  constellationClearance: 1.5,
  constellationLineClearance: 0.55,
  constellationInteriorClearance: 0.85,
  starfieldClip: { x: 0, y: 0, width: 100, height: 60 },
  preserveAspectRatio: 'xMidYMid slice',
  constellation: {
    clip: { x: 44, y: 32, width: 56, height: 36 },
    tx: 54,
    ty: 30,
    scale: 1.65,
    starSizeScale: 1.5,
  },
}

export const HERO_SKY_TABLET = {
  id: 'tablet',
  starCount: 145,
  starSeed: 58219,
  yMax: 60,
  yDenseMax: 50,
  minSpacing: 1.8,
  constellationClearance: 1.85,
  constellationLineClearance: 0.85,
  constellationInteriorClearance: 1.05,
  starfieldClip: { x: 0, y: 0, width: 100, height: 60 },
  preserveAspectRatio: 'xMidYMid slice',
  constellation: {
    clip: { x: 40, y: 26, width: 60, height: 32 },
    tx: 50,
    ty: 26,
    scale: 1.35,
    starSizeScale: 1.35,
  },
}

export const HERO_SKY_MOBILE = {
  id: 'mobile',
  starCount: 95,
  starSeed: 58219,
  yMax: 88,
  ySpawnMin: 6,
  ySpawnMax: 68,
  yDenseShare: 0.74,
  yDensePower: 0.88,
  yDenseSpan: 0.78,
  minSpacing: 2.45,
  constellationClearance: 2.5,
  constellationLineClearance: 1.15,
  constellationInteriorClearance: 1.35,
  constellationLineGlowPx: 7,
  starfieldSizeScale: 0.78,
  starfieldClip: { x: 0, y: 0, width: 100, height: 88 },
  preserveAspectRatio: 'xMidYMid slice',
  constellationViewBox: { x: 35, y: 31, width: 32, height: 36 },
  constellation: {
    clip: { x: 35, y: 31, width: 32, height: 36 },
    tx: 37.9,
    ty: 33.5,
    scale: 1.28,
    starSizeScale: 1.5,
    starMinBoost: 1,
  },
}

export function getHeroSkyLayout(viewportWidth) {
  if (viewportWidth <= 480) return HERO_SKY_MOBILE
  if (viewportWidth <= 920) return HERO_SKY_TABLET
  return HERO_SKY_DESKTOP
}
