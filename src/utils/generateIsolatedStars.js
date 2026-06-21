import { ISOLATED_STAR_TIERS } from '../config/isolatedStarSizes.js'
import {
  HERO_CORNER_ZONES,
  heroCircleBlend,
  inHeroTitleClearZone,
  isInsideHeroCircle,
  isOutsideHeroCircle,
} from '../config/heroStarMapLayout.js'
import { violatesConstellationSpacing } from './constellationWorldGeometry.js'

export { MIN_ISOLATED_STAR_DISTANCE } from '../config/isolatedStarSizes.js'

const INSIDE_SHARE = 0.22
const MARGIN = 3

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

function sampleInZone(rand, zone) {
  return {
    x: zone.xMin + rand() * (zone.xMax - zone.xMin),
    y: zone.yMin + rand() * (zone.yMax - zone.yMin),
  }
}

function sampleInsideCircle(rand) {
  for (let attempt = 0; attempt < 24; attempt++) {
    const angle = rand() * Math.PI * 2
    const dist = rand() * 0.82
    const x = 50 + Math.cos(angle) * 40 * dist
    const y = 80 + Math.sin(angle) * 40 * dist

    if (isInsideHeroCircle(x, y) && !inHeroTitleClearZone(x, y) && y < 56) {
      return { x, y }
    }
  }

  return null
}

function pickOutsideZone(rand) {
  const cornerKeys = Object.keys(HERO_CORNER_ZONES)
  const roll = rand()

  if (roll < 0.72) {
    return HERO_CORNER_ZONES[cornerKeys[Math.floor(rand() * cornerKeys.length)]]
  }

  const band = 0.34
  const edgeUnit = rand()
  const onVerticalEdge = rand() < 0.5
  const span = 100 - MARGIN * 2

  return {
    xMin: onVerticalEdge ? MARGIN : MARGIN + edgeUnit * span * (1 - band),
    xMax: onVerticalEdge ? MARGIN + band * span : MARGIN + span,
    yMin: onVerticalEdge ? MARGIN + edgeUnit * span * (1 - band) : MARGIN,
    yMax: onVerticalEdge ? MARGIN + span : MARGIN + band * span,
  }
}

function sampleOutsideCircle(rand) {
  for (let attempt = 0; attempt < 24; attempt++) {
    const zone = pickOutsideZone(rand)
    const { x, y } = sampleInZone(rand, zone)

    if (isOutsideHeroCircle(x, y) && !inHeroTitleClearZone(x, y)) {
      return { x, y }
    }
  }

  return null
}

function starRadius(x, y, rand, mode) {
  const blend = heroCircleBlend(x, y)

  if (mode === 'inside') {
    return +(0.05 + rand() * 0.05).toFixed(2)
  }

  const outsideWeight = Math.max(blend, mode === 'outside' ? 0.72 : 0.45)
  const roll = rand()

  if (outsideWeight > 0.55 && roll > 0.42) {
    return +(0.11 + rand() * 0.07).toFixed(2)
  }

  if (outsideWeight > 0.72 && roll > 0.78) {
    return +(ISOLATED_STAR_TIERS.large.rMin + rand() * (ISOLATED_STAR_TIERS.large.rMax - ISOLATED_STAR_TIERS.large.rMin)).toFixed(2)
  }

  return +(0.08 + rand() * 0.04).toFixed(2)
}

function violatesSpacing(stars, candidate) {
  for (const star of stars) {
    if (distance(candidate, star) < 1.5 + candidate.r + star.r) {
      return true
    }
  }
  return false
}

function placeCornerSeeds(rand, clusters) {
  const seeds = []

  for (const zone of Object.values(HERO_CORNER_ZONES)) {
    for (let index = 0; index < 5; index++) {
      for (let attempt = 0; attempt < 20; attempt++) {
        const { x, y } = sampleInZone(rand, zone)

        if (!isOutsideHeroCircle(x, y) || inHeroTitleClearZone(x, y)) {
          continue
        }

        const candidate = {
          x: +x.toFixed(1),
          y: +y.toFixed(1),
          r: starRadius(x, y, rand, 'outside'),
          zone: 'outside',
        }

        if (violatesSpacing(seeds, candidate)) {
          continue
        }

        if (clusters.length && violatesConstellationSpacing(candidate, clusters)) {
          continue
        }

        seeds.push(candidate)
        break
      }
    }
  }

  return seeds
}

export function generateIsolatedStars(count, options = {}) {
  const { seed = 42857, clusters = [] } = options
  const rand = mulberry32(seed)
  const stars = placeCornerSeeds(rand, clusters)
  const insideTarget = Math.round(count * INSIDE_SHARE)
  const maxAttempts = count * 500
  let attempts = 0

  while (stars.length < count && attempts < maxAttempts) {
    attempts++
    const wantInside = stars.filter((star) => star.zone === 'inside').length < insideTarget
    const mode = wantInside && rand() < 0.58 ? 'inside' : 'outside'
    const point = mode === 'inside' ? sampleInsideCircle(rand) : sampleOutsideCircle(rand)

    if (!point) {
      continue
    }

    const { x, y } = point
    const candidate = {
      x: +x.toFixed(1),
      y: +y.toFixed(1),
      r: starRadius(x, y, rand, mode),
      zone: mode,
    }

    if (inHeroTitleClearZone(candidate.x, candidate.y)) {
      continue
    }

    if (violatesSpacing(stars, candidate)) {
      continue
    }

    if (clusters.length && violatesConstellationSpacing(candidate, clusters)) {
      continue
    }

    stars.push(candidate)
  }

  return stars
}
