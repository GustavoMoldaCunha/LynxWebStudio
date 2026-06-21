import { BACKGROUND_STAR_TIERS, MIN_BACKGROUND_STAR_DISTANCE } from '../config/backgroundStarSizes.js'
import { LOOSE_STAR_MAX_RADIUS } from '../config/starScaleHierarchy.js'
import { HERO_CIRCLE, distanceToHeroCircleCenter } from '../config/heroStarMapLayout.js'
import { violatesConstellationSpacing } from './constellationWorldGeometry.js'

const MARGIN = 1.5
const TWINKLE_SHARE = 0.3
const CIRCLE_CORE_RADIUS = 20
const CIRCLE_MID_RADIUS = 34
const CIRCLE_CORE_SEED_TARGET = 42
const GRID_COLS = 12
const GRID_ROWS = 14
const GRID_STARS_PER_CELL = 2
const CONSTELLATION_CLEARANCE = 0.85

function mulberry32(seed) {
  return function next() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function buildTierQueue(count, rand) {
  const counts = {
    tiny: Math.round(count * BACKGROUND_STAR_TIERS.tiny.share),
    medium: Math.round(count * BACKGROUND_STAR_TIERS.medium.share),
    large: Math.round(count * BACKGROUND_STAR_TIERS.large.share),
  }

  let assigned = counts.tiny + counts.medium + counts.large
  while (assigned > count) {
    if (counts.large > 0) counts.large--
    else if (counts.medium > 0) counts.medium--
    else counts.tiny--
    assigned--
  }
  while (assigned < count) {
    counts.tiny++
    assigned++
  }

  const queue = [
    ...Array(counts.tiny).fill('tiny'),
    ...Array(counts.medium).fill('medium'),
    ...Array(counts.large).fill('large'),
  ]

  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[queue[i], queue[j]] = [queue[j], queue[i]]
  }

  return queue
}

function radiusForTier(tierKey, rand) {
  const tier = BACKGROUND_STAR_TIERS[tierKey]
  const r = tier.rMin + rand() * (tier.rMax - tier.rMin)
  return +Math.min(r, LOOSE_STAR_MAX_RADIUS).toFixed(2)
}

function sampleUniform(rand) {
  return {
    x: MARGIN + rand() * (100 - MARGIN * 2),
    y: MARGIN + rand() * (100 - MARGIN * 2),
  }
}

function sampleNearCircleCenter(rand, preferCore = false) {
  const angle = rand() * Math.PI * 2
  const maxRadius = preferCore || rand() < 0.58 ? CIRCLE_CORE_RADIUS : CIRCLE_MID_RADIUS
  const dist = Math.pow(rand(), 0.55) * maxRadius

  return {
    x: HERO_CIRCLE.cx + Math.cos(angle) * dist,
    y: HERO_CIRCLE.cy + Math.sin(angle) * dist,
  }
}

function sampleEdgeBoost(rand) {
  const edge = Math.floor(rand() * 4)
  const span = 100 - MARGIN * 2
  const depth = 10 + rand() * 8

  if (edge === 0) {
    return { x: MARGIN + rand() * span, y: MARGIN + rand() * depth }
  }
  if (edge === 1) {
    return { x: MARGIN + rand() * span, y: 100 - MARGIN - depth + rand() * depth }
  }
  if (edge === 2) {
    return { x: MARGIN + rand() * depth, y: MARGIN + rand() * span }
  }
  return { x: 100 - MARGIN - depth + rand() * depth, y: MARGIN + rand() * span }
}

function sampleUnderfilledBand(rand, stars) {
  const bands = [
    { yMin: MARGIN, yMax: 25 },
    { yMin: 25, yMax: 50 },
    { yMin: 50, yMax: 75 },
    { yMin: 75, yMax: 100 - MARGIN },
  ]
  const counts = bands.map((band) =>
    stars.filter((star) => star.y >= band.yMin && star.y < band.yMax).length,
  )
  const minCount = Math.min(...counts)
  const candidates = bands.filter((_, index) => counts[index] === minCount)
  const band = candidates[Math.floor(rand() * candidates.length)]

  return {
    x: MARGIN + rand() * (100 - MARGIN * 2),
    y: band.yMin + rand() * (band.yMax - band.yMin),
  }
}

function samplePosition(rand, stars = []) {
  const roll = rand()

  if (roll < 0.5) {
    return sampleUnderfilledBand(rand, stars)
  }

  if (roll < 0.68) {
    return sampleUniform(rand)
  }

  if (roll < 0.82) {
    return sampleNearCircleCenter(rand)
  }

  return sampleEdgeBoost(rand)
}

function isInViewBox(x, y) {
  return x >= MARGIN && x <= 100 - MARGIN && y >= MARGIN && y <= 100 - MARGIN
}

function buildStarCandidate(x, y, tier, rand) {
  const twinkle = rand() < TWINKLE_SHARE

  return {
    x: +x.toFixed(1),
    y: +y.toFixed(1),
    r: radiusForTier(tier, rand),
    tier,
    twinkle,
    twinkleDuration: twinkle ? +(2 + rand() * 4).toFixed(2) : undefined,
    twinkleDelay: twinkle ? +(rand() * 6).toFixed(2) : undefined,
  }
}

function tryPlaceStar(stars, candidate, extraPoints, clusters, minGapScale = 1) {
  if (!isInViewBox(candidate.x, candidate.y)) {
    return false
  }

  const minGap =
    candidate.tier === 'large'
      ? BACKGROUND_STAR_TIERS.large.minSpacing
      : MIN_BACKGROUND_STAR_DISTANCE * minGapScale

  for (const star of stars) {
    if (distance(candidate, star) < minGap + candidate.r + star.r) {
      return false
    }
  }

  for (const point of extraPoints) {
    const pointRadius = point.r ?? 0.08
    if (distance(candidate, point) < MIN_BACKGROUND_STAR_DISTANCE * minGapScale + candidate.r + pointRadius) {
      return false
    }
  }

  if (clusters.length && violatesConstellationSpacing(candidate, clusters, CONSTELLATION_CLEARANCE)) {
    return false
  }

  stars.push(candidate)
  return true
}

function placeGridSeeds(rand, stars, tierQueue, tierIndexRef, clusters, reservedPoints, count) {
  const spanX = 100 - MARGIN * 2
  const spanY = 100 - MARGIN * 2
  const cellW = spanX / GRID_COLS
  const cellH = spanY / GRID_ROWS
  const gridBudget = Math.min(
    GRID_COLS * GRID_ROWS * GRID_STARS_PER_CELL,
    Math.floor(count * 0.68),
  )
  let placed = 0

  for (let pass = 0; pass < GRID_STARS_PER_CELL; pass++) {
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        if (stars.length >= count || placed >= gridBudget) {
          return placed
        }

        const xMin = MARGIN + col * cellW
        const yMin = MARGIN + row * cellH

        for (let attempt = 0; attempt < 10; attempt++) {
          const x = xMin + rand() * cellW
          const y = yMin + rand() * cellH
          const tier = tierQueue[tierIndexRef.value] || 'tiny'
          const candidate = buildStarCandidate(x, y, tier, rand)

          if (tryPlaceStar(stars, candidate, reservedPoints, clusters, 0.78)) {
            placed++
            tierIndexRef.value++
            break
          }
        }
      }
    }
  }

  return placed
}

function placeCircleCoreSeeds(rand, stars, tierQueue, tierIndexRef, clusters, reservedPoints, count) {
  let placed = 0
  const coreBudget = Math.min(CIRCLE_CORE_SEED_TARGET, Math.floor(count * 0.1))
  const maxAttempts = coreBudget * 120

  for (let attempt = 0; placed < coreBudget && stars.length < count && attempt < maxAttempts; attempt++) {
    const { x, y } = sampleNearCircleCenter(rand, true)

    if (distanceToHeroCircleCenter(x, y) > CIRCLE_CORE_RADIUS) {
      continue
    }

    const tier = tierQueue[tierIndexRef.value] || 'tiny'
    const candidate = buildStarCandidate(x, y, tier, rand)

    if (tryPlaceStar(stars, candidate, reservedPoints, clusters, 0.75)) {
      placed++
      tierIndexRef.value++
    }
  }

  return placed
}

function violatesSpacing(stars, candidate, extraPoints = []) {
  const minGap =
    candidate.tier === 'large'
      ? BACKGROUND_STAR_TIERS.large.minSpacing
      : MIN_BACKGROUND_STAR_DISTANCE

  for (const star of stars) {
    if (distance(candidate, star) < minGap + candidate.r + star.r) {
      return true
    }
  }

  for (const point of extraPoints) {
    const pointRadius = point.r ?? 0.08
    if (distance(candidate, point) < MIN_BACKGROUND_STAR_DISTANCE + candidate.r + pointRadius) {
      return true
    }
  }

  return false
}

export function generateBackgroundStars(count, options = {}) {
  const { seed = 90421, clusters = [], isolatedStars = [] } = options
  const rand = mulberry32(seed)
  const tierQueue = buildTierQueue(count, rand)
  const stars = []
  const maxAttempts = count * 1400
  let attempts = 0
  let tierIndex = 0

  const reservedPoints = isolatedStars.map((star) => ({
    x: star.x,
    y: star.y,
    r: star.r,
  }))
  const tierIndexRef = { value: 0 }

  placeGridSeeds(rand, stars, tierQueue, tierIndexRef, clusters, reservedPoints, count)
  placeCircleCoreSeeds(rand, stars, tierQueue, tierIndexRef, clusters, reservedPoints, count)
  tierIndex = tierIndexRef.value

  while (stars.length < count && attempts < maxAttempts) {
    attempts++
    const tier = tierQueue[tierIndex] || 'tiny'
    const { x, y } = samplePosition(rand, stars)
    const candidate = buildStarCandidate(x, y, tier, rand)

    if (violatesSpacing(stars, candidate, reservedPoints)) {
      continue
    }

    if (clusters.length && violatesConstellationSpacing(candidate, clusters, CONSTELLATION_CLEARANCE)) {
      continue
    }

    if (!isInViewBox(candidate.x, candidate.y)) {
      continue
    }

    stars.push(candidate)
    tierIndex++
  }

  return stars
}
