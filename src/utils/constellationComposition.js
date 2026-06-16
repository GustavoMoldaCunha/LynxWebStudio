export const HERO_FOCAL = { x: 42, y: 44 }
export const FOCAL_SOFT_RADIUS = 22
export const FOCAL_CORE_RADIUS = 11

export function focalDistance(x, y) {
  return Math.hypot(x - HERO_FOCAL.x, y - HERO_FOCAL.y)
}

export function focalRepulsionStrength(x, y, weight = 1) {
  const dist = focalDistance(x, y)

  if (dist >= FOCAL_SOFT_RADIUS) {
    return { x: 0, y: 0 }
  }

  const t = 1 - dist / FOCAL_SOFT_RADIUS
  const coreBoost = dist < FOCAL_CORE_RADIUS ? 1.35 : 1
  const magnitude = t * t * 1.45 * weight * coreBoost
  const angle = dist < 0.01 ? -0.72 : Math.atan2(y - HERO_FOCAL.y, x - HERO_FOCAL.x)

  return {
    x: Math.cos(angle) * magnitude,
    y: Math.sin(angle) * magnitude,
  }
}

export function frameConvergenceNudge(x, y, cluster) {
  const dist = focalDistance(x, y)

  if (dist < 30) {
    return { x: 0, y: 0 }
  }

  const interest = (cluster.spread ? 1.15 : 1) * (cluster.nodes.length >= 5 ? 1.1 : 1)
  const angle = Math.atan2(y - HERO_FOCAL.y, x - HERO_FOCAL.x)
  const magnitude = Math.min(1.1, (dist - 28) * 0.018) * interest

  return {
    x: Math.cos(angle) * magnitude,
    y: Math.sin(angle) * magnitude,
  }
}

export function acceptsFocalPlacement(x, y, tier, rand) {
  const dist = focalDistance(x, y)

  if (dist >= FOCAL_SOFT_RADIUS) {
    return true
  }

  const t = 1 - dist / FOCAL_SOFT_RADIUS
  let rejectChance = t * 0.5

  if (tier === 'large') {
    rejectChance = Math.min(0.9, rejectChance + 0.3)
  } else if (tier === 'medium') {
    rejectChance = Math.min(0.78, rejectChance + 0.14)
  }

  if (dist < FOCAL_CORE_RADIUS) {
    rejectChance = Math.min(0.88, rejectChance + 0.22)
  }

  return rand() >= rejectChance
}
