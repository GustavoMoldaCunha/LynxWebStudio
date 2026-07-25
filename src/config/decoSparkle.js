/** Four-point star path shared by DecoSparkle and hero constellation vertices. */
export const DECO_SPARKLE_PATH =
  'M12 0.75C12.86 8.32 15.68 11.14 23.25 12C15.68 12.86 12.86 15.68 12 23.25C11.14 15.68 8.32 12.86 0.75 12C8.32 11.14 11.14 8.32 12 0.75Z'

export const DECO_SPARKLE_VIEW_SIZE = 24

/** Approximate arm length from viewBox center to tip (for scaling to match constellation nodes). */
export const DECO_SPARKLE_ARM = 11.25

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
