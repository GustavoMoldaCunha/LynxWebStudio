function mulberry32(seed) {
  return function next() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const TWINKLE_FRAMES = {
  rest: { opacity: 0.72, scale: 0.94 },
  rise: { opacity: 0.65, scale: 1.05 },
  peak: { opacity: 1, scale: 1.38 },
  settle: { opacity: 0.84, scale: 1.04 },
  ease: { opacity: 0.75, scale: 0.98 },
}

/** Brighter rest state so constellation lines do not read through the nodes. */
export const CONSTELLATION_TWINKLE_FRAMES = {
  rest: { opacity: 0.98, scale: 0.96 },
  rise: { opacity: 0.94, scale: 1.05 },
  peak: { opacity: 1, scale: 1.38 },
  settle: { opacity: 0.97, scale: 1.04 },
  ease: { opacity: 0.95, scale: 0.98 },
}

export function twinkleTiming(rand) {
  const interval = 4 + rand() * 8
  const flashDuration = 0.8
  const total = interval + flashDuration
  const holdEnd = (interval / total) * 100
  const flashSpan = 100 - holdEnd

  return {
    twinkleDuration: +total.toFixed(2),
    twinkleDelay: +(rand() * total).toFixed(2),
    holdEnd: +holdEnd.toFixed(2),
    riseAt: +(holdEnd + flashSpan * (0.08 + rand() * 0.06)).toFixed(2),
    peakAt: +(holdEnd + flashSpan * (0.22 + rand() * 0.16)).toFixed(2),
    settleAt: +(holdEnd + flashSpan * (0.40 + rand() * 0.10)).toFixed(2),
    easeAt: +Math.min(
      99.2,
      holdEnd + flashSpan * (0.74 + rand() * 0.12),
    ).toFixed(2),
  }
}

export function assignTwinkleTiming(items, seed = 58219, options = {}) {
  const { delayStagger = 0 } = options
  const rand = mulberry32(seed)

  return items.map((item, index) => {
    const timing = twinkleTiming(rand)

    return {
      ...item,
      id: item.id ?? index,
      twinkle: true,
      ...timing,
      twinkleDelay: +(timing.twinkleDelay + index * delayStagger).toFixed(2),
    }
  })
}

export function twinkleAnimationName(id) {
  return `hero-star-twinkle-${id}`
}

export function buildTwinkleKeyframesCss(items, frames = TWINKLE_FRAMES) {
  const { rest, rise, peak, settle, ease } = frames

  return items
    .filter((item) => item.twinkle)
    .map(
      (item) => `@keyframes ${twinkleAnimationName(item.id)} {
  0%, ${item.holdEnd}% {
    opacity: ${rest.opacity};
    transform: scale(${rest.scale});
  }
  ${item.riseAt}% {
    opacity: ${rise.opacity};
    transform: scale(${rise.scale});
  }
  ${item.peakAt}% {
    opacity: ${peak.opacity};
    transform: scale(${peak.scale});
  }
  ${item.settleAt}% {
    opacity: ${settle.opacity};
    transform: scale(${settle.scale});
  }
  ${item.easeAt}% {
    opacity: ${ease.opacity};
    transform: scale(${ease.scale});
  }
  100% {
    opacity: ${rest.opacity};
    transform: scale(${rest.scale});
  }
}`,
    )
    .join('\n')
}

export function twinkleAnimationStyle(item, options = {}) {
  if (!item.twinkle) return undefined

  const startOffset = options.startOffset ?? 0

  return {
    animationName: twinkleAnimationName(item.id),
    animationDuration: `${item.twinkleDuration}s`,
    animationDelay: `${item.twinkleDelay + startOffset}s`,
  }
}
