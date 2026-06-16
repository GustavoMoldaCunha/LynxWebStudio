import { ISOLATED_STAR_TIERS } from './isolatedStarSizes.js'

/** Largest possible isolated star radius (viewBox units). */
export const ISOLATED_MAX_RADIUS = ISOLATED_STAR_TIERS.large.rMax

/** Base constellation star radii in viewBox units (after cluster scale is applied). */
export const CONSTELLATION_WORLD_RADIUS = {
  primary: 0.36,
  secondary: 0.3,
}

/** Light per-node size spread within a constellation (world-space). */
export const CONSTELLATION_RADIUS_JITTER = 0.035

const CONSTELLATION_RADIUS_LIMITS = {
  primary: { min: 0.33, max: 0.39 },
  secondary: { min: 0.28, max: 0.32 },
}

/** Smallest constellation node radius in world/viewBox units. */
export const CONSTELLATION_MIN_WORLD_RADIUS = CONSTELLATION_RADIUS_LIMITS.secondary.min

/** Loose stars must stay below constellation nodes. */
export const LOOSE_STAR_MAX_RADIUS = +(CONSTELLATION_MIN_WORLD_RADIUS - 0.02).toFixed(2)

function constellationNodeJitter(clusterId, nodeIndex) {
  let hash = 0
  const key = `${clusterId}-${nodeIndex}`

  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i)
    hash |= 0
  }

  const t = (Math.abs(hash) % 1000) / 1000
  return (t - 0.5) * 2 * CONSTELLATION_RADIUS_JITTER
}

export function constellationNodeWorldRadius(cluster, nodeIndex) {
  const role = nodeIndex === 0 ? 'primary' : 'secondary'
  const base = CONSTELLATION_WORLD_RADIUS[role]
  const { min, max } = CONSTELLATION_RADIUS_LIMITS[role]
  const jitter = constellationNodeJitter(cluster.id, nodeIndex)

  return +Math.min(max, Math.max(min, base + jitter)).toFixed(2)
}

export function constellationNodeRadius(cluster, nodeIndex) {
  return constellationNodeWorldRadius(cluster, nodeIndex) / cluster.scale
}
