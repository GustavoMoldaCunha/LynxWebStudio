/**
 * Isolated star size tiers (viewBox units).
 * Capped below constellation secondary nodes (min 0.28).
 */

/** Minimum clearance between isolated stars, constellation nodes and connection lines. */
export const MIN_ISOLATED_STAR_DISTANCE = 1.6

export const ISOLATED_STAR_TIERS = {
  small: { share: 0.65, rMin: 0.05, rMax: 0.1 },
  medium: { share: 0.25, rMin: 0.11, rMax: 0.18 },
  large: { share: 0.1, rMin: 0.19, rMax: 0.26, minSpacing: 7.5 },
}

const TIER_ORDER = ['small', 'medium', 'large']

function mulberry32(seed) {
  return function next() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function radiusForTier(tierKey, rand) {
  const tier = ISOLATED_STAR_TIERS[tierKey]
  const r = tier.rMin + rand() * (tier.rMax - tier.rMin)
  return +Math.min(r, tier.rMax).toFixed(2)
}

export function buildTierQueue(count, seed = 7919) {
  const counts = {
    small: Math.round(count * ISOLATED_STAR_TIERS.small.share),
    medium: Math.round(count * ISOLATED_STAR_TIERS.medium.share),
    large: Math.round(count * ISOLATED_STAR_TIERS.large.share),
  }

  let assigned = counts.small + counts.medium + counts.large
  while (assigned > count) {
    if (counts.large > 0) counts.large--
    else if (counts.medium > 0) counts.medium--
    else counts.small--
    assigned--
  }
  while (assigned < count) {
    counts.small++
    assigned++
  }

  const queue = [
    ...Array(counts.small).fill('small'),
    ...Array(counts.medium).fill('medium'),
    ...Array(counts.large).fill('large'),
  ]

  const rand = mulberry32(seed)
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[queue[i], queue[j]] = [queue[j], queue[i]]
  }

  return queue
}

export function pickReplacementTier(index, rand) {
  const roll = rand()
  if (roll < ISOLATED_STAR_TIERS.small.share) return 'small'
  if (roll < ISOLATED_STAR_TIERS.small.share + ISOLATED_STAR_TIERS.medium.share) return 'medium'
  return 'large'
}

export { TIER_ORDER }
