/** Four-point star path shared by DecoSparkle and hero constellation vertices. */
export const DECO_SPARKLE_PATH =
  'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z'

export const DECO_SPARKLE_VIEW_SIZE = 24

/** Approximate arm length from viewBox center to tip (for scaling to match constellation nodes). */
export const DECO_SPARKLE_ARM = 9

/** Halo radius factor for plain sparkles (matches HeroStarfield sparkleGlowRadius). */
export const SPARKLE_GLOW_R_FACTOR = 2.35

/** Visible radius in viewBox units (for spacing and exclusion). */
export function heroStarExtent(star) {
  if (star.sparkle) {
    const arm = star.sparkleScale * DECO_SPARKLE_ARM
    return star.glow ? star.glowR : arm * SPARKLE_GLOW_R_FACTOR
  }

  return star.glow ? star.glowR : star.r
}
