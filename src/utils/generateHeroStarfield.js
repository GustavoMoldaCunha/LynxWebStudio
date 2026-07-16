import { DECO_SPARKLE_ARM, heroStarExtent } from '../config/decoSparkle.js'
import { twinkleTiming } from './heroStarTwinkle.js'
import { violatesHeroConstellation } from './heroConstellationExclusion.js'

const GLOW_SHARE = 0.14
const SPARKLE_SHARE = 0.12

const R_SMALL_MIN = 0.1
const R_SMALL_MAX = 0.28
const R_GLOW_MIN = 0.28
const R_GLOW_MAX = 0.44
const GLOW_R_MIN_FACTOR = 2.1
const GLOW_R_MAX_FACTOR = 2.85

const SPARKLE_ARM_MIN = 0.36
const SPARKLE_ARM_MAX = 0.58
const SPARKLE_GLOW_ARM_MIN = 0.48
const SPARKLE_GLOW_ARM_MAX = 0.72

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

function sampleY(rand, spawnMin, spawnMax, options = {}) {
  const {
    yUniform = false,
    yDenseShare = 0.78,
    yDensePower = 0.4,
    yDenseSpan = 0.82,
  } = options

  if (yUniform) {
    return spawnMin + rand() * (spawnMax - spawnMin)
  }

  const span = spawnMax - spawnMin
  const denseLimit = spawnMin + span * yDenseSpan

  if (rand() < yDenseShare) {
    return spawnMin + Math.pow(rand(), yDensePower) * (denseLimit - spawnMin)
  }

  return denseLimit + rand() * (spawnMax - denseLimit)
}

function violatesSpacing(stars, candidate, minSpacing) {
  const candidateExtent = heroStarExtent(candidate)

  for (const star of stars) {
    const gap = minSpacing + heroStarExtent(star) + candidateExtent
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

export function generateHeroStarfield(layout, viewportWidth) {
  const {
    starCount: count = 210,
    starSeed: seed = 58219,
    yMax = 60,
    yDenseMax = 50,
    ySpawnMin = 0,
    ySpawnMax = yDenseMax,
    yDenseShare = 0.78,
    yDensePower = 0.4,
    yDenseSpan = 0.82,
    yUniform = false,
    minSpacing = 1.6,
    glowShare = GLOW_SHARE,
    sparkleShare = SPARKLE_SHARE,
    sparkleGlowAllowed = true,
    sparkleArmMin = SPARKLE_ARM_MIN,
    sparkleArmMax = SPARKLE_ARM_MAX,
    sparkleGlowArmMin = SPARKLE_GLOW_ARM_MIN,
    sparkleGlowArmMax = SPARKLE_GLOW_ARM_MAX,
  } = layout

  const rand = mulberry32(seed)
  const stars = []
  const glowTarget = Math.max(4, Math.round(count * glowShare))
  const sparkleTarget = Math.max(1, Math.round(count * sparkleShare))
  let glowPlaced = 0
  let sparklePlaced = 0
  let attempts = 0
  const maxAttempts = count * 80
  const ySampleOptions = { yUniform, yDenseShare, yDensePower, yDenseSpan }

  while (stars.length < count && attempts < maxAttempts) {
    attempts += 1

    const x = rand() * 100
    const y = sampleY(rand, ySpawnMin, ySpawnMax, ySampleOptions)
    const remaining = count - stars.length
    const glowRemaining = glowTarget - glowPlaced
    const sparkleRemaining = sparkleTarget - sparklePlaced
    const preferGlow = glowPlaced < glowTarget
    const preferSparkle = sparklePlaced < sparkleTarget
    let isGlow = preferGlow && (rand() < 0.28 || remaining <= glowRemaining)
    let isSparkle =
      preferSparkle && (rand() < 0.28 || remaining <= sparkleRemaining)

    if (isGlow && isAboveThirdConstellation(x, y)) {
      isGlow = false
    }

    if (isSparkle && isAboveThirdConstellation(x, y)) {
      isSparkle = false
    }

    let r
    let glowR = 0
    let glow = false
    let sparkle = false
    let sparkleScale = 0

    if (isSparkle && isGlow && !sparkleGlowAllowed) {
      isGlow = false
    }

    if (isSparkle) {
      sparkle = true
      sparklePlaced += 1

      if (isGlow) {
        glow = true
        glowPlaced += 1
        const arm =
          sparkleGlowArmMin +
          rand() * (sparkleGlowArmMax - sparkleGlowArmMin)
        sparkleScale = arm / DECO_SPARKLE_ARM
        r = arm
        glowR = glowRadiusForCore(
          arm,
          GLOW_R_MIN_FACTOR + rand() * (GLOW_R_MAX_FACTOR - GLOW_R_MIN_FACTOR),
        )
      } else {
        const arm =
          sparkleArmMin + rand() * (sparkleArmMax - sparkleArmMin)
        sparkleScale = arm / DECO_SPARKLE_ARM
        r = arm
      }
    } else if (isGlow) {
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

    const extent = heroStarExtent({ glow, glowR, sparkle, sparkleScale, r })
    const candidate = {
      x: +x.toFixed(2),
      y: +y.toFixed(2),
      r: +r.toFixed(3),
      glowR: +glowR.toFixed(3),
      glow,
      sparkle,
      sparkleScale: sparkle ? +sparkleScale.toFixed(4) : 0,
    }

    function rollbackQuotas() {
      if (sparkle) sparklePlaced -= 1
      if (glow) glowPlaced -= 1
    }

    if (!withinBounds({ ...candidate, extent }, yMax)) {
      rollbackQuotas()
      continue
    }

    if (violatesSpacing(stars, candidate, minSpacing)) {
      rollbackQuotas()
      continue
    }

    if (
      !layout.starfieldIgnoreConstellation &&
      violatesHeroConstellation(candidate, layout, { viewportWidth })
    ) {
      rollbackQuotas()
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
