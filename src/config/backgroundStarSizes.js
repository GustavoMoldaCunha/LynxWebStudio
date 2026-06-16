import { LOOSE_STAR_MAX_RADIUS } from './starScaleHierarchy.js'

/**
 * Background star size tiers (viewBox units).
 * Capped below constellation secondary nodes (min 0.28).
 */

export const BACKGROUND_STAR_TIERS = {
  tiny: { share: 0.76, rMin: 0.08, rMax: 0.15 },
  medium: { share: 0.19, rMin: 0.16, rMax: 0.22 },
  large: { share: 0.05, rMin: 0.23, rMax: LOOSE_STAR_MAX_RADIUS, minSpacing: 3.5 },
}

export const MIN_BACKGROUND_STAR_DISTANCE = 0.55
