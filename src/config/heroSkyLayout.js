/** Shared hero sky layout profiles (viewBox 0–100 coords). */
export const HERO_SKY_DESKTOP = {
  id: 'desktop',
  starCount: 210,
  starSeed: 58219,
  yMax: 60,
  yDenseMax: 50,
  starfieldClip: { x: 0, y: 0, width: 100, height: 60 },
  preserveAspectRatio: 'xMidYMid slice',
  constellation: {
    clip: { x: 46, y: 6, width: 54, height: 48 },
    tx: 54,
    ty: 16,
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
  starfieldClip: { x: 0, y: 0, width: 100, height: 60 },
  preserveAspectRatio: 'xMidYMid slice',
  constellation: {
    clip: { x: 42, y: 4, width: 58, height: 42 },
    tx: 50,
    ty: 14,
    scale: 1.35,
    starSizeScale: 1.35,
  },
}

export const HERO_SKY_MOBILE = {
  id: 'mobile',
  starCount: 78,
  starSeed: 58219,
  yMax: 60,
  yDenseMax: 50,
  starfieldClip: { x: 0, y: 0, width: 100, height: 60 },
  preserveAspectRatio: 'xMidYMid slice',
  constellation: {
    clip: { x: 50, y: 2, width: 50, height: 34 },
    tx: 56,
    ty: 12,
    scale: 1.02,
    starSizeScale: 1.2,
  },
}

export function getHeroSkyLayout(viewportWidth) {
  if (viewportWidth <= 480) return HERO_SKY_MOBILE
  if (viewportWidth <= 920) return HERO_SKY_TABLET
  return HERO_SKY_DESKTOP
}
