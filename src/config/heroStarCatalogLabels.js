/** Sparse star-chart notation labels for the hero constellation SVG. */

/** Matches ConstellationBackground viewBox width (0 0 100 100). */
export const HERO_SVG_VIEWBOX_WIDTH = 100

/** ~9–11px on screen at a ~1400px-wide viewport, expressed in viewBox units. */
const TARGET_SCREEN_PX_MIN = 9
const TARGET_SCREEN_PX_MAX = 11
const REFERENCE_VIEWPORT_PX = 1400
const viewBoxFontScale = HERO_SVG_VIEWBOX_WIDTH / REFERENCE_VIEWPORT_PX

export const HERO_CATALOG_LABEL_FONT_SIZE_MIN = TARGET_SCREEN_PX_MIN * viewBoxFontScale
export const HERO_CATALOG_LABEL_FONT_SIZE_MAX = TARGET_SCREEN_PX_MAX * viewBoxFontScale

/** Max letter-spacing in viewBox units (0.5 at a 1400-unit-wide coordinate space). */
export const HERO_CATALOG_LABEL_LETTER_SPACING = 0.5 * viewBoxFontScale

export const constellationNodeLabels = []

export const backgroundStarLabels = [
  { x: 39.5, y: 7.5, text: 'NGC 441', dx: 0.9, dy: 0.95, fontSize: 0.71 },
  { x: 80.8, y: 20, text: 'DEC +22°', dx: 0.88, dy: 0.98, fontSize: 0.64 },
  { x: 85.3, y: 23.7, text: 'Δ 0.7', dx: 0.9, dy: 0.96, fontSize: 0.66 },
]
