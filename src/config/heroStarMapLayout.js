export const HERO_CIRCLE = {
  cx: 50,
  cy: 80,
  outerRadius: 40,
  transitionWidth: 8,
}

export const HERO_TITLE_CLEAR_ZONE = {
  xMin: 18,
  xMax: 82,
  yMin: 58,
  yMax: 98,
}

export const HERO_CORNER_ZONES = {
  topLeft: { xMin: 5, xMax: 22, yMin: 5, yMax: 22 },
  topRight: { xMin: 78, xMax: 95, yMin: 5, yMax: 22 },
  bottomLeft: { xMin: 5, xMax: 22, yMin: 78, yMax: 95 },
  bottomRight: { xMin: 78, xMax: 95, yMin: 78, yMax: 95 },
}

export function distanceToHeroCircleCenter(x, y) {
  return Math.hypot(x - HERO_CIRCLE.cx, y - HERO_CIRCLE.cy)
}

export function heroCircleBlend(x, y) {
  const dist = distanceToHeroCircleCenter(x, y)
  const inner = HERO_CIRCLE.outerRadius - HERO_CIRCLE.transitionWidth * 0.5
  const outer = HERO_CIRCLE.outerRadius + HERO_CIRCLE.transitionWidth * 0.5
  const t = (dist - inner) / (outer - inner)
  return Math.max(0, Math.min(1, t))
}

export function isInsideHeroCircle(x, y) {
  return distanceToHeroCircleCenter(x, y) < HERO_CIRCLE.outerRadius - HERO_CIRCLE.transitionWidth * 0.35
}

export function isOutsideHeroCircle(x, y) {
  return distanceToHeroCircleCenter(x, y) > HERO_CIRCLE.outerRadius + HERO_CIRCLE.transitionWidth * 0.35
}

export function inHeroTitleClearZone(x, y) {
  return (
    x >= HERO_TITLE_CLEAR_ZONE.xMin &&
    x <= HERO_TITLE_CLEAR_ZONE.xMax &&
    y >= HERO_TITLE_CLEAR_ZONE.yMin &&
    y <= HERO_TITLE_CLEAR_ZONE.yMax
  )
}
