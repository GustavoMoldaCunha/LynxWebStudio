import {
  HERO_CURSOR_PATH_POINTS,
  HERO_CURSOR_VERTICES,
} from '../config/heroCursorConstellation.js'
import { heroStarExtent } from '../config/decoSparkle.js'
import { distancePointToSegment } from './constellationWorldGeometry.js'
import { flooredScreenSize, fallbackMinPx } from './heroStarScreenFloor.js'

const NODE_CORE_LOCAL_R = 1.568
const CONSTELLATION_SPARKLE_ARM_FACTOR = 0.58
const TWINKLE_PEAK_SCALE = 1.08
const STROKE_BASE_PX = 6
const STROKE_MAX_PX = 11
const STROKE_GLOW_BASE_PX = 6
const LINE_GLOW_BLUR_FACTOR = 2.75

function transformPoint(x, y, tx, ty, scale) {
  return { x: tx + x * scale, y: ty + y * scale }
}

function strokeScreenPx(viewportWidth) {
  const width = viewportWidth || 1280
  const t = Math.min(1, Math.max(0, (width - 1024) / (1920 - 1024)))
  return STROKE_BASE_PX + t * (STROKE_MAX_PX - STROKE_BASE_PX)
}

function strokeClearanceViewBox(viewportWidth, layout) {
  const pxPerUnit = (viewportWidth || 1280) / 100
  const strokePx = strokeScreenPx(viewportWidth)
  const glowPx = layout?.constellationLineGlowPx ?? STROKE_GLOW_BASE_PX * (strokePx / STROKE_BASE_PX)
  const halfStroke = strokePx / 2
  const glowReach = glowPx * LINE_GLOW_BLUR_FACTOR
  const base = (halfStroke + glowReach) / pxPerUnit
  const extra = layout?.constellationLineClearance ?? 0.5

  return base + extra
}

function estimateNodeSparkleWorldR(vertex, layout, viewportWidth, svgWidthPx) {
  const { scale, starSizeScale = 1.5 } = layout.constellation
  const viewW = layout.constellationViewBox?.width ?? 100
  const width = svgWidthPx || viewportWidth || 1280
  const localArm =
    CONSTELLATION_SPARKLE_ARM_FACTOR * starSizeScale * (vertex.sparkleScale ?? 1)
  const floorPx = fallbackMinPx('constellationSparkle', width)
  const flooredArm = flooredScreenSize(localArm, floorPx, width, viewW, scale)

  return flooredArm * scale * TWINKLE_PEAK_SCALE
}

function estimateNodeWorldR(vertex, layout, viewportWidth, svgWidthPx) {
  const { scale, starSizeScale = 1.5, starMinBoost = 1 } = layout.constellation
  const baseR = NODE_CORE_LOCAL_R * starSizeScale * starMinBoost * (vertex.sparkleScale ?? 1)
  const viewW = layout.constellationViewBox?.width ?? 100
  const width = svgWidthPx || viewportWidth || 1280
  const floorPx = fallbackMinPx('constellation', width)
  const localR = flooredScreenSize(baseR, floorPx, width, viewW, scale)
  const glowWorldR = localR * scale * TWINKLE_PEAK_SCALE
  const sparkleWorldR = estimateNodeSparkleWorldR(
    vertex,
    layout,
    viewportWidth,
    svgWidthPx,
  )

  return Math.max(glowWorldR, sparkleWorldR) + 0.3
}

function polygonCentroid(polygon) {
  let x = 0
  let y = 0

  for (const point of polygon) {
    x += point.x
    y += point.y
  }

  return { x: x / polygon.length, y: y / polygon.length }
}

function inflatePolygon(polygon, margin) {
  if (margin <= 0) return polygon

  const centroid = polygonCentroid(polygon)

  return polygon.map((point) => {
    const dx = point.x - centroid.x
    const dy = point.y - centroid.y
    const len = Math.hypot(dx, dy) || 1

    return {
      x: point.x + (dx / len) * margin,
      y: point.y + (dy / len) * margin,
    }
  })
}

function pointInPolygon(point, polygon) {
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x
    const yi = polygon[i].y
    const xj = polygon[j].x
    const yj = polygon[j].y
    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi

    if (intersect) inside = !inside
  }

  return inside
}

export function getHeroCursorConstellationWorld(layout, options = {}) {
  const constellation = layout?.constellation
  if (!constellation) return null

  const { tx, ty, scale } = constellation
  if (tx == null || ty == null || !scale) return null

  const { viewportWidth, svgWidthPx } = options
  const hasViewport = Boolean(viewportWidth)

  const nodes = HERO_CURSOR_VERTICES.map((vertex) => {
    const world = transformPoint(vertex.x, vertex.y, tx, ty, scale)
    const r = hasViewport
      ? estimateNodeWorldR(vertex, layout, viewportWidth, svgWidthPx)
      : NODE_CORE_LOCAL_R * (constellation.starSizeScale ?? 1.5) * (vertex.sparkleScale ?? 1) * scale * 1.2

    return { ...world, r }
  })

  const segments = []
  for (let i = 0; i < HERO_CURSOR_PATH_POINTS.length - 1; i += 1) {
    const a = HERO_CURSOR_PATH_POINTS[i]
    const b = HERO_CURSOR_PATH_POINTS[i + 1]
    segments.push([
      transformPoint(a.x, a.y, tx, ty, scale),
      transformPoint(b.x, b.y, tx, ty, scale),
    ])
  }

  const polygon = HERO_CURSOR_PATH_POINTS.slice(0, -1).map((point) =>
    transformPoint(point.x, point.y, tx, ty, scale),
  )

  return {
    nodes,
    segments,
    polygon,
    strokeClearance: strokeClearanceViewBox(viewportWidth, layout),
  }
}

export function starCandidateExtent(star) {
  return heroStarExtent(star)
}

export function violatesHeroConstellation(candidate, layout, options = {}) {
  const world = getHeroCursorConstellationWorld(layout, options)
  if (!world) return false

  const clearance = options.minClearance ?? layout.constellationClearance ?? 1.5
  const extent = starCandidateExtent(candidate)
  const interiorPad =
    options.interiorClearance ??
    layout.constellationInteriorClearance ??
    clearance * 0.65 + extent * 0.45
  const interiorZone = inflatePolygon(world.polygon, interiorPad)

  if (pointInPolygon(candidate, interiorZone)) {
    return true
  }

  for (const node of world.nodes) {
    const gap = clearance + extent + node.r
    if (Math.hypot(candidate.x - node.x, candidate.y - node.y) < gap) {
      return true
    }
  }

  for (const [a, b] of world.segments) {
    const gap = clearance + extent + world.strokeClearance
    if (distancePointToSegment(candidate, a, b) < gap) {
      return true
    }
  }

  return false
}
