<template>
  <component :is="'style'">{{ twinkleKeyframes }}</component>
  <svg
    ref="svgRef"
    class="hero-constellations"
    :viewBox="svgViewBox"
    :preserveAspectRatio="layout.preserveAspectRatio"
    :style="parallaxStyle"
    aria-hidden="true"
  >
    <defs>
      <clipPath :id="clipId">
        <rect
          :x="clipRect.x"
          :y="clipRect.y"
          :width="clipRect.width"
          :height="clipRect.height"
        />
      </clipPath>
      <radialGradient id="constellation-star-unified" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="5%" stop-color="#f2f4ff" />
        <stop offset="11%" stop-color="#cfc9fc" />
        <stop offset="22%" stop-color="#380FE9" stop-opacity="0.82" />
        <stop offset="40%" stop-color="#380FE9" stop-opacity="0.38" />
        <stop offset="62%" stop-color="#380FE9" stop-opacity="0.14" />
        <stop offset="100%" stop-color="#380FE9" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="constellation-sparkle-fill" cx="50%" cy="50%" r="72%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="40%" stop-color="#eef1ff" />
        <stop offset="78%" stop-color="#cfc9fc" />
        <stop offset="100%" stop-color="#9078f0" />
      </radialGradient>
      <filter id="constellation-line-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur :stdDeviation="cursorLineGlowStdDeviation" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g :clip-path="`url(#${clipId})`">
      <g
        class="constellation-group cursor-constellation"
        :transform="constellationTransform"
        :style="{ '--cursor-path-stroke-width': cursorPathStrokeWidth }"
      >
        <defs>
          <clipPath :id="leftShaftClipId">
            <rect
              :x="LEFT_SHAFT_CLIP.x"
              :y="LEFT_SHAFT_CLIP.y"
              :width="LEFT_SHAFT_CLIP.width"
              :height="leftShaftRevealHeight"
            />
          </clipPath>
        </defs>

        <path
          v-for="segment in cursorGeometry.segments"
          :key="segment.id"
          :ref="(el) => setSegmentPathRef(segment.id, el)"
          :data-segment-id="segment.id"
          class="cursor-path"
          fill="none"
          stroke-linejoin="round"
          stroke-linecap="round"
          :d="segment.d"
        />

        <path
          ref="leftShaftPathRef"
          :data-segment-id="cursorGeometry.leftShaft.id"
          class="cursor-path cursor-path--left-shaft"
          fill="none"
          stroke-linejoin="round"
          stroke-linecap="round"
          :clip-path="`url(#${leftShaftClipId})`"
          :d="cursorGeometry.leftShaft.d"
        />

        <g
          v-for="vertex in CURSOR_VERTEX_ENTRIES"
          :key="vertex.id"
          class="constellation-node"
          :style="vertex.style"
        >
          <g
            class="hero-star-twinkle"
            :style="vertex.twinkleStyle"
          >
            <circle
              :cx="vertex.x"
              :cy="vertex.y"
              :r="starGlowR"
              fill="url(#constellation-star-unified)"
            />
            <path
              class="cursor-vertex-star"
              :d="DECO_SPARKLE_PATH"
              :transform="decoStarTransform(vertex)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import {
  DECO_SPARKLE_ARM,
  DECO_SPARKLE_PATH,
  DECO_SPARKLE_VIEW_SIZE,
} from '../config/decoSparkle.js'
import {
  HERO_CURSOR_VERTICES,
  buildHeroCursorGeometry,
  compressVerticesY,
} from '../config/heroCursorConstellation.js'
import { useHeroSkyLayout } from '../composables/useHeroSkyLayout.js'
import {
  flooredScreenSize,
  fallbackMinPx,
  readHeroStarFloorsPx,
} from '../utils/heroStarScreenFloor.js'
import {
  assignTwinkleTiming,
  buildTwinkleKeyframesCss,
  CONSTELLATION_TWINKLE_FRAMES,
  TWINKLE_FRAMES,
  twinkleAnimationStyle,
} from '../utils/heroStarTwinkle.js'
import '../styles/heroStarMinRadius.css'
import '../styles/heroStarTwinkle.css'

const STAR_STAGGER_S = 0.1
const STAR_REVEAL_DURATION_S = 0.36
const LINE_DRAW_DURATION_S = 1
const TWINKLE_REVEAL_LEAD_S = 0.1

const VERTEX_COUNT = HERO_CURSOR_VERTICES.length

const STARS_END_S =
  (VERTEX_COUNT - 1) * STAR_STAGGER_S + STAR_REVEAL_DURATION_S

/** Deliberate close — longer than a proportional share so the descent reads clearly. */
const LEFT_SHAFT_DRAW_DURATION_S = 0.85

const LINES_END_S = STARS_END_S + LINE_DRAW_DURATION_S + LEFT_SHAFT_DRAW_DURATION_S

const props = defineProps({
  parallaxX: {
    type: Number,
    default: 0,
  },
  parallaxY: {
    type: Number,
    default: 0,
  },
})

const { layout, viewportWidth } = useHeroSkyLayout()

const svgRef = ref(null)
const svgWidthPx = ref(0)
const leftShaftPathRef = ref(null)
const leftShaftRevealHeight = ref(0)

const segmentPathRefs = new Map()
const lineDrawTimers = []
const lineDrawAnimRafs = []
const SETUP_LINE_DRAW_MAX_RAF_RETRIES = 16

let lineDrawRafId = 0

function setSegmentPathRef(id, el) {
  if (el) {
    segmentPathRefs.set(id, el)
  } else {
    segmentPathRefs.delete(id)
  }
}

function getLeftShaftPath() {
  const fromRef = leftShaftPathRef.value
  if (fromRef?.isConnected) return fromRef

  const fromDom = svgRef.value?.querySelector(`[data-segment-id="${cursorLeftShaft.value.id}"]`)
  if (fromDom) {
    leftShaftPathRef.value = fromDom
    return fromDom
  }

  return null
}

function getSegmentPath(id) {
  const fromRef = segmentPathRefs.get(id)
  if (fromRef?.isConnected) return fromRef

  const fromDom = svgRef.value?.querySelector(`[data-segment-id="${id}"]`)
  if (fromDom) {
    segmentPathRefs.set(id, fromDom)
    return fromDom
  }

  return null
}

const clipId = computed(() => `constellation-bounds-${layout.value.id}`)

const leftShaftClipId = computed(() => `left-shaft-reveal-${layout.value.id}`)

const LEFT_SHAFT_CLIP = computed(() => ({
  x: cursorVertices.value[0].x - 1.5,
  y: cursorVertices.value[0].y,
  width: 3,
}))

const constellationLayout = computed(() => layout.value.constellation)

const cursorGeometry = computed(() => {
  const lineCompress = constellationLayout.value.lineCompress ?? 1
  const vertices = compressVerticesY(HERO_CURSOR_VERTICES, lineCompress, HERO_CURSOR_VERTICES[0].y)
  return buildHeroCursorGeometry(vertices)
})

const cursorVertices = computed(() => cursorGeometry.value.vertices)
const cursorSegments = computed(() => cursorGeometry.value.segments)
const cursorLeftShaft = computed(() => cursorGeometry.value.leftShaft)

const constellationViewBoxWidth = computed(
  () => layout.value.constellationViewBox?.width ?? 100,
)

function constellationFloors() {
  const boost = constellationLayout.value.starMinBoost ?? 1
  let floors

  if (svgRef.value) {
    floors = readHeroStarFloorsPx(svgRef.value, { variant: 'constellation' })
  } else {
    floors = {
      glow: fallbackMinPx('constellation', viewportWidth.value),
      sparkle: fallbackMinPx('constellationSparkle', viewportWidth.value),
    }
  }

  return {
    glow: floors.glow * boost,
    sparkle: floors.sparkle * boost,
  }
}

const svgViewBox = computed(() => {
  const focused = layout.value.constellationViewBox
  if (!focused) return '0 0 100 100'
  return `${focused.x} ${focused.y} ${focused.width} ${focused.height}`
})

const starGlowR = computed(() => {
  const baseR = 1.568 * constellationLayout.value.starSizeScale
  const { scale } = constellationLayout.value
  const width = svgWidthPx.value || viewportWidth.value
  const floors = constellationFloors()

  return +flooredScreenSize(
    baseR,
    floors.glow,
    width,
    constellationViewBoxWidth.value,
    scale,
  ).toFixed(3)
})

const clipRect = computed(() => {
  const { clip, scale } = constellationLayout.value
  const worldGlowR = starGlowR.value * scale
  const glowPad = worldGlowR * TWINKLE_FRAMES.peak.scale + 0.75
  const padTop = glowPad
  const padSide = glowPad
  const padBottom = glowPad * 0.45

  const x = Math.max(0, clip.x - padSide)
  const y = Math.max(0, clip.y - padTop)

  return {
    x,
    y,
    width: Math.min(100 - x, clip.width + padSide * 2),
    height: Math.min(100 - y, clip.height + padTop + padBottom),
  }
})

const constellationTransform = computed(() => {
  const { tx, ty, scale } = constellationLayout.value
  return `translate(${tx} ${ty}) scale(${scale})`
})

const parallaxStyle = computed(() => {
  if (!props.parallaxX && !props.parallaxY) return undefined

  return {
    transform: `translate3d(${props.parallaxX.toFixed(2)}px, ${props.parallaxY.toFixed(2)}px, 0)`,
  }
})

/** Screen pixels per local unit inside the scaled constellation group. */
function constellationPxPerLocalUnit() {
  const scale = constellationLayout.value.scale ?? 1
  const width = svgWidthPx.value || viewportWidth.value
  const viewBoxWidth = constellationViewBoxWidth.value || 100
  return (width / viewBoxWidth) * scale
}

const CURSOR_PATH_SCREEN_STROKE_PX = 6
const CURSOR_LINE_GLOW_SCREEN_PX = 0.9
const cursorPathStrokeWidth = computed(() => {
  const pxPerLocal = constellationPxPerLocalUnit()
  if (!pxPerLocal) return '0.19'
  return (CURSOR_PATH_SCREEN_STROKE_PX / pxPerLocal).toFixed(4)
})

/** Local user-unit blur so the scaled filter reads ~0.9px on screen. */
const cursorLineGlowStdDeviation = computed(() => {
  const pxPerLocal = constellationPxPerLocalUnit()
  if (!pxPerLocal) return 0.055
  return +(CURSOR_LINE_GLOW_SCREEN_PX / pxPerLocal).toFixed(4)
})

const decoStarScale = computed(() => {
  const sizeScale = constellationLayout.value.starSizeScale
  const { scale } = constellationLayout.value
  const baseScale = (0.58 * sizeScale) / DECO_SPARKLE_ARM
  const width = svgWidthPx.value || viewportWidth.value
  const floors = constellationFloors()
  const flooredArm = flooredScreenSize(
    baseScale * DECO_SPARKLE_ARM,
    floors.sparkle,
    width,
    constellationViewBoxWidth.value,
    scale,
  )

  return flooredArm / DECO_SPARKLE_ARM
})

const DECO_STAR_CENTER = DECO_SPARKLE_VIEW_SIZE / 2

const CURSOR_VERTICES = computed(() =>
  assignTwinkleTiming(cursorVertices.value, 47103, {
    delayStagger: 0.18,
  }),
)

function vertexTwinkleStartOffset(index) {
  return Math.max(
    0,
    index * STAR_STAGGER_S + STAR_REVEAL_DURATION_S * 0.45 - TWINKLE_REVEAL_LEAD_S,
  )
}

function cssSeconds(value) {
  return `${Number(value).toFixed(3)}s`
}

const CURSOR_VERTEX_ENTRIES = computed(() =>
  CURSOR_VERTICES.value.map((vertex, index) => ({
    ...vertex,
    style: {
      '--delay': cssSeconds(index * STAR_STAGGER_S),
      '--duration': cssSeconds(STAR_REVEAL_DURATION_S),
    },
    twinkleStyle: twinkleAnimationStyle(vertex, {
      startOffset: vertexTwinkleStartOffset(index),
    }),
  })),
)

const twinkleKeyframes = computed(() =>
  buildTwinkleKeyframesCss(CURSOR_VERTICES.value, CONSTELLATION_TWINKLE_FRAMES),
)

function decoStarTransform(vertex) {
  const scale = decoStarScale.value * (vertex.sparkleScale ?? 1)
  return `translate(${vertex.x} ${vertex.y}) scale(${scale}) translate(${-DECO_STAR_CENTER} ${-DECO_STAR_CENTER})`
}

function cancelLineDrawRaf() {
  if (lineDrawRafId) {
    window.cancelAnimationFrame(lineDrawRafId)
    lineDrawRafId = 0
  }
}

function cancelLineDrawAnimRafs() {
  for (const rafId of lineDrawAnimRafs) {
    window.cancelAnimationFrame(rafId)
  }
  lineDrawAnimRafs.length = 0
}

function clearLineDrawTimers() {
  cancelLineDrawRaf()
  cancelLineDrawAnimRafs()
  for (const timerId of lineDrawTimers) {
    window.clearTimeout(timerId)
  }
  lineDrawTimers.length = 0
}

function finalizeSegmentStroke(path) {
  path.style.transition = 'none'
  path.style.strokeDasharray = 'none'
  path.style.strokeDashoffset = '0'
}

function easeOutQuad(t) {
  return 1 - (1 - t) * (1 - t)
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

function animateSegmentOffset(path, length, durationMs, ease = easeOutQuad) {
  const start = performance.now()

  function tick(now) {
    const t = Math.min(1, (now - start) / durationMs)
    path.style.strokeDashoffset = `${length * (1 - ease(t))}`

    if (t < 1) {
      lineDrawAnimRafs.push(window.requestAnimationFrame(tick))
      return
    }

    finalizeSegmentStroke(path)
  }

  lineDrawAnimRafs.push(window.requestAnimationFrame(tick))
}

function countReadySegmentPaths() {
  let count = 0

  for (const segment of cursorSegments.value) {
    if (getSegmentPath(segment.id)) count += 1
  }

  return count
}

function countReadyDrawPaths() {
  return countReadySegmentPaths() + (getLeftShaftPath() ? 1 : 0)
}

function animateLeftShaftReveal(durationMs) {
  const start = performance.now()
  const fullHeight = cursorLeftShaft.value.length

  function tick(now) {
    const t = Math.min(1, (now - start) / durationMs)
    leftShaftRevealHeight.value = fullHeight * easeInOutQuad(t)

    if (t < 1) {
      lineDrawAnimRafs.push(window.requestAnimationFrame(tick))
      return
    }

    leftShaftRevealHeight.value = fullHeight
  }

  lineDrawAnimRafs.push(window.requestAnimationFrame(tick))
}

function setupLeftShaftDraw(reducedMotion) {
  if (!getLeftShaftPath()) return false

  leftShaftRevealHeight.value = 0

  if (reducedMotion) {
    leftShaftRevealHeight.value = cursorLeftShaft.value.length
    return true
  }

  const delayMs = (STARS_END_S + LINE_DRAW_DURATION_S) * 1000
  const durationMs = LEFT_SHAFT_DRAW_DURATION_S * 1000

  lineDrawTimers.push(
    window.setTimeout(() => {
      if (!getLeftShaftPath()) return
      animateLeftShaftReveal(durationMs)
    }, delayMs),
  )

  return true
}

function scheduleLineDrawRetry(rafAttempt) {
  if (rafAttempt >= SETUP_LINE_DRAW_MAX_RAF_RETRIES) return

  lineDrawRafId = window.requestAnimationFrame(() => {
    lineDrawRafId = 0
    setupLineDraw(rafAttempt + 1)
  })
}

function setupLineDraw(rafAttempt = 0) {
  clearLineDrawTimers()

  if (countReadyDrawPaths() < cursorSegments.value.length + 1) {
    scheduleLineDrawRetry(rafAttempt)
    return
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const segmentDraws = []

  for (const segment of cursorSegments.value) {
    const path = getSegmentPath(segment.id)
    if (!path) {
      scheduleLineDrawRetry(rafAttempt)
      return
    }

    const length = path.getTotalLength()
    if (length <= 0) continue

    segmentDraws.push({ segmentId: segment.id, length })
  }

  if (segmentDraws.length < cursorSegments.value.length) {
    scheduleLineDrawRetry(rafAttempt)
    return
  }

  if (!setupLeftShaftDraw(reducedMotion)) {
    scheduleLineDrawRetry(rafAttempt)
    return
  }

  for (const { segmentId, length } of segmentDraws) {
    const path = getSegmentPath(segmentId)
    if (!path) continue

    path.style.transition = 'none'
    path.style.strokeDasharray = `${length} 9999`
    path.style.strokeDashoffset = `${length}`

    if (reducedMotion) {
      finalizeSegmentStroke(path)
    }
  }

  if (reducedMotion) return

  for (const { segmentId } of segmentDraws) {
    const path = getSegmentPath(segmentId)
    if (path) void path.getBoundingClientRect()
  }

  const totalLength = segmentDraws.reduce((sum, item) => sum + item.length, 0)
  let cumulativeDelayS = STARS_END_S

  for (const { segmentId, length } of segmentDraws) {
    const durationS = (length / totalLength) * LINE_DRAW_DURATION_S
    const delayMs = cumulativeDelayS * 1000
    const durationMs = durationS * 1000

    lineDrawTimers.push(
      window.setTimeout(() => {
        const path = getSegmentPath(segmentId)
        if (!path) return
        animateSegmentOffset(path, length, durationMs)
      }, delayMs),
    )

    cumulativeDelayS += durationS
  }

  lineDrawTimers.push(
    window.setTimeout(() => {
      for (const segment of cursorSegments.value) {
        const path = getSegmentPath(segment.id)
        if (path) finalizeSegmentStroke(path)
      }

      leftShaftRevealHeight.value = cursorLeftShaft.value.length
    }, (LINES_END_S + 0.2) * 1000),
  )
}

function syncSvgWidth() {
  svgWidthPx.value = svgRef.value?.getBoundingClientRect().width ?? viewportWidth.value
}

onMounted(async () => {
  syncSvgWidth()
  await nextTick()
  await new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))
  })
  setupLineDraw()
  window.addEventListener('resize', syncSvgWidth, { passive: true })
})

onUnmounted(() => {
  clearLineDrawTimers()
  window.removeEventListener('resize', syncSvgWidth)
})
</script>

<style scoped>
.hero-constellations {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.cursor-path {
  fill: none;
  stroke: #380FE9;
  stroke-width: var(--cursor-path-stroke-width, 0.19);
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: url(#constellation-line-glow);
  opacity: 0.96;
}

/* Vertical shaft: fixed screen stroke; clip-path reveal avoids dash + non-scaling-stroke conflict. */
.cursor-path--left-shaft {
  vector-effect: non-scaling-stroke;
  stroke-width: 6px;
  filter: none;
}

.cursor-vertex-star {
  fill: url(#constellation-sparkle-fill);
}

.hero-constellations :deep(.hero-star-twinkle) {
  opacity: 0.98;
}

.constellation-node {
  opacity: 0;
  transform: scale(0.42);
  transform-box: fill-box;
  transform-origin: center;
  animation-name: constellation-node-reveal;
  animation-duration: var(--duration, 0.36s);
  animation-delay: var(--delay, 0s);
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

@keyframes constellation-node-reveal {
  0% {
    opacity: 0;
    transform: scale(0.42);
  }

  72% {
    opacity: 1;
    transform: scale(1.08);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-constellations :deep(.hero-star-twinkle) {
    opacity: 1;
    animation: none;
  }

  .constellation-node {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
