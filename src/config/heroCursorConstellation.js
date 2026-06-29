export const HERO_CURSOR_VERTICES = [
  { id: 'c-v0', x: 4, y: 2.5, sparkleScale: 1.35 },
  { id: 'c-v1', x: 4, y: 19.5 },
  { id: 'c-v2', x: 8.2, y: 15.6 },
  { id: 'c-v3', x: 10.5, y: 21 },
  { id: 'c-v4', x: 13, y: 19.9 },
  { id: 'c-v5', x: 10.8, y: 14.7 },
  { id: 'c-v6', x: 17, y: 14 },
]

export const HERO_CURSOR_PATH_POINTS = [
  ...HERO_CURSOR_VERTICES,
  HERO_CURSOR_VERTICES[0],
]

function formatSegmentPath(start, end) {
  return `M${start.x},${start.y} L${end.x},${end.y}`
}

/** Animated edges (v1 → v2 → … → v6 → v0). v0 → v1 is the left shaft — see HERO_CURSOR_LEFT_SHAFT. */
const HERO_CURSOR_ANIMATED_VERTEX_PAIRS = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 0],
]

/** Measured path lengths in local viewBox units (matches SVG getTotalLength). */
const HERO_CURSOR_SEGMENT_LENGTHS_BY_PAIR = {
  '1-2': 5.731,
  '2-3': 5.868,
  '3-4': 2.731,
  '4-5': 5.647,
  '5-6': 6.239,
  '6-0': 17.356,
}

function pairKey(fromIndex, toIndex) {
  return `${fromIndex}-${toIndex}`
}

/** Top-left → bottom-left vertical shaft; drawn downward after the main outline. */
export const HERO_CURSOR_LEFT_SHAFT = {
  id: 'c-s-left-shaft',
  d: formatSegmentPath(HERO_CURSOR_VERTICES[0], HERO_CURSOR_VERTICES[1]),
  length: 17,
}

/** Ordered edge segments for progressive line draw after star reveal. */
export const HERO_CURSOR_SEGMENTS = HERO_CURSOR_ANIMATED_VERTEX_PAIRS.map(([fromIndex, toIndex], index) => {
  const start = HERO_CURSOR_VERTICES[fromIndex]
  const end = HERO_CURSOR_VERTICES[toIndex]

  return {
    id: `c-s${index}`,
    d: formatSegmentPath(start, end),
    length: HERO_CURSOR_SEGMENT_LENGTHS_BY_PAIR[pairKey(fromIndex, toIndex)],
  }
})

export const HERO_CURSOR_INTRO_PATH =
  'M4,2.5 L4,19.5 L8.2,15.6 L10.5,21 L13,19.9 L10.8,14.7 L17,14 Z'

/** Measured length of HERO_CURSOR_INTRO_PATH. */
export const HERO_CURSOR_INTRO_LENGTH = 60.673
