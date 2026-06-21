import { twinkleTiming } from './heroStarTwinkle.js'

const GLOW_SHARE = 0.14
const MIN_SPACING = 1.15

const R_SMALL_MIN = 0.1
const R_SMALL_MAX = 0.28
const R_GLOW_MIN = 0.28
const R_GLOW_MAX = 0.44
const GLOW_R_MIN_FACTOR = 2.1
const GLOW_R_MAX_FACTOR = 2.85

/** Upper-right sky above the cursor constellation (viewBox units). */
const THIRD_CONSTELLATION_GLOW_ZONE = { xMin: 56, xMax: 100, yMax: 16 }

function glowRadiusForCore(r, factor = GLOW_R_MAX_FACTOR) {
  return +(r * factor).toFixed(3)
}

function isAboveThirdConstellation(x, y) {
  return (
    x >= THIRD_CONSTELLATION_GLOW_ZONE.xMin &&
    x <= THIRD_CONSTELLATION_GLOW_ZONE.xMax &&
    y <= THIRD_CONSTELLATION_GLOW_ZONE.yMax
  )
}

function mulberry32(seed) {
  return function next() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function sampleY(rand, yMax, yDenseMax) {
  if (rand() < 0.78) {
    return Math.pow(rand(), 0.4) * yDenseMax
  }

  return yDenseMax + rand() * (yMax - yDenseMax)
}

function violatesSpacing(stars, candidate) {
  for (const star of stars) {
    const gap = MIN_SPACING + star.r + candidate.r
    if (Math.hypot(star.x - candidate.x, star.y - candidate.y) < gap) {
      return true
    }
  }
  return false
}

function withinBounds({ x, y, extent }, yMax) {
  return (
    x - extent >= 0 &&
    x + extent <= 100 &&
    y - extent >= 0 &&
    y + extent <= yMax
  )
}

export function generateHeroStarfield(layout) {
  const {
    starCount: count = 210,
    starSeed: seed = 58219,
    yMax = 60,
    yDenseMax = 50,
  } = layout

  const rand = mulberry32(seed)
  const stars = []
  const glowTarget = Math.max(6, Math.round(count * GLOW_SHARE))
  let glowPlaced = 0
  let attempts = 0
  const maxAttempts = count * 50

  while (stars.length < count && attempts < maxAttempts) {
    attempts += 1

    const x = rand() * 100
    const y = sampleY(rand, yMax, yDenseMax)
    const remaining = count - stars.length
    const glowRemaining = glowTarget - glowPlaced
    const preferGlow = glowPlaced < glowTarget
    let isGlow = preferGlow && (rand() < 0.28 || remaining <= glowRemaining)

    if (isGlow && isAboveThirdConstellation(x, y)) {
      isGlow = false
    }

    let r
    let glowR = 0
    let glow = false

    if (isGlow) {
      glow = true
      r = R_GLOW_MIN + rand() * (R_GLOW_MAX - R_GLOW_MIN)
      glowR = glowRadiusForCore(
        r,
        GLOW_R_MIN_FACTOR + rand() * (GLOW_R_MAX_FACTOR - GLOW_R_MIN_FACTOR),
      )
      glowPlaced += 1
    } else {
      r = R_SMALL_MIN + rand() * (R_SMALL_MAX - R_SMALL_MIN)
    }

    const extent = glow ? glowR : r
    const candidate = {
      x: +x.toFixed(2),
      y: +y.toFixed(2),
      r: +r.toFixed(3),
      glowR: +glowR.toFixed(3),
      glow,
    }

    if (!withinBounds({ ...candidate, extent }, yMax)) {
      if (glow) glowPlaced -= 1
      continue
    }

    if (violatesSpacing(stars, candidate)) {
      if (glow) glowPlaced -= 1
      continue
    }

    const twinkle = glow
    const timing = twinkle ? twinkleTiming(rand) : null

    stars.push({
      id: stars.length,
      ...candidate,
      twinkle,
      ...(timing ?? {}),
    })
  }

  return stars
}
