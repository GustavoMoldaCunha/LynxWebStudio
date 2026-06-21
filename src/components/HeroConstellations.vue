<template>
  <component :is="'style'">{{ twinkleKeyframes }}</component>
  <svg
    class="hero-constellations"
    viewBox="0 0 100 100"
    :preserveAspectRatio="layout.preserveAspectRatio"
    aria-hidden="true"
  >
    <defs>
      <clipPath :id="clipId">
        <rect
          :x="constellationLayout.clip.x"
          :y="constellationLayout.clip.y"
          :width="constellationLayout.clip.width"
          :height="constellationLayout.clip.height"
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
      <radialGradient id="constellation-sparkle-fill" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="45%" stop-color="#e8eeff" />
        <stop offset="100%" stop-color="#380FE9" />
      </radialGradient>
      <filter id="constellation-line-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="0.9" result="blur" />
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
      >
        <path
          class="cursor-path"
          fill="none"
          stroke-linejoin="round"
          stroke-linecap="round"
          d="M4 2.5 L4 19.5 L8.2 15.6 L10.5 21 L13 19.9 L10.8 14.7 L17 14 Z"
        />

        <g
          v-for="vertex in CURSOR_VERTICES"
          :key="vertex.id"
          class="constellation-node"
          :style="nodeRevealStyle()"
        >
          <g
            class="hero-star-twinkle"
            :style="constellationTwinkleStyle(vertex)"
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
import { computed } from 'vue'
import {
  DECO_SPARKLE_ARM,
  DECO_SPARKLE_PATH,
  DECO_SPARKLE_VIEW_SIZE,
} from '../config/decoSparkle.js'
import { useHeroSkyLayout } from '../composables/useHeroSkyLayout.js'
import {
  assignTwinkleTiming,
  buildTwinkleKeyframesCss,
  twinkleAnimationStyle,
} from '../utils/heroStarTwinkle.js'
import '../styles/heroStarTwinkle.css'

const DRAW_DURATION_S = 2
const REVEAL_DURATION_S = 0.55
const TWINKLE_START_OFFSET_S = DRAW_DURATION_S + REVEAL_DURATION_S

const { layout } = useHeroSkyLayout()

const clipId = computed(() => `constellation-bounds-${layout.value.id}`)

const constellationLayout = computed(() => layout.value.constellation)

const constellationTransform = computed(() => {
  const { tx, ty, scale } = constellationLayout.value
  return `translate(${tx} ${ty}) scale(${scale})`
})

const starGlowR = computed(() => {
  const sizeScale = constellationLayout.value.starSizeScale
  return 1.568 * sizeScale
})

const decoStarScale = computed(() => {
  const sizeScale = constellationLayout.value.starSizeScale
  return (0.58 * sizeScale) / DECO_SPARKLE_ARM
})

const DECO_STAR_CENTER = DECO_SPARKLE_VIEW_SIZE / 2

const CURSOR_VERTICES = assignTwinkleTiming(
  [
    { id: 'c-v0', x: 4, y: 2.5 },
    { id: 'c-v1', x: 4, y: 19.5 },
    { id: 'c-v2', x: 8.2, y: 15.6 },
    { id: 'c-v3', x: 10.5, y: 21 },
    { id: 'c-v4', x: 13, y: 19.9 },
    { id: 'c-v5', x: 10.8, y: 14.7 },
    { id: 'c-v6', x: 17, y: 14 },
  ],
  47103,
  { delayStagger: 1.35 },
)

const twinkleKeyframes = computed(() => buildTwinkleKeyframesCss(CURSOR_VERTICES))

function constellationTwinkleStyle(vertex) {
  return twinkleAnimationStyle(vertex, { startOffset: TWINKLE_START_OFFSET_S })
}

function decoStarTransform(vertex) {
  return `translate(${vertex.x} ${vertex.y}) scale(${decoStarScale.value}) translate(${-DECO_STAR_CENTER} ${-DECO_STAR_CENTER})`
}

function nodeRevealStyle() {
  return {
    animationDelay: `${DRAW_DURATION_S}s`,
    animationDuration: `${REVEAL_DURATION_S}s`,
  }
}
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
  stroke-width: 6px;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
  filter: url(#constellation-line-glow);
  opacity: 0.96;
}

.cursor-vertex-star {
  fill: url(#constellation-sparkle-fill);
}

.constellation-node {
  opacity: 0;
  animation: constellation-node-reveal ease forwards;
}

@keyframes constellation-node-reveal {
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .constellation-node {
    opacity: 1;
    animation: none;
  }
}
</style>
