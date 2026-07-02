<template>
  <component :is="'style'">{{ twinkleKeyframes }}</component>
  <svg
    ref="svgRef"
    class="hero-starfield"
    viewBox="0 0 100 100"
    :preserveAspectRatio="layout.preserveAspectRatio"
    aria-hidden="true"
  >
    <defs>
      <clipPath :id="clipId">
        <rect
          :x="layout.starfieldClip.x"
          :y="layout.starfieldClip.y"
          :width="layout.starfieldClip.width"
          :height="layout.starfieldClip.height"
        />
      </clipPath>
      <radialGradient id="hero-star-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="12%" stop-color="#e8eeff" />
        <stop offset="38%" stop-color="#6b4ff0" stop-opacity="0.72" />
        <stop offset="62%" stop-color="#380FE9" stop-opacity="0.28" />
        <stop offset="100%" stop-color="#380FE9" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="hero-star-glow-unified" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="5%" stop-color="#f2f4ff" />
        <stop offset="11%" stop-color="#cfc9fc" />
        <stop offset="22%" stop-color="#380FE9" stop-opacity="0.82" />
        <stop offset="40%" stop-color="#380FE9" stop-opacity="0.38" />
        <stop offset="62%" stop-color="#380FE9" stop-opacity="0.14" />
        <stop offset="100%" stop-color="#380FE9" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="hero-star-sparkle-fill" cx="50%" cy="50%" r="72%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="40%" stop-color="#eef1ff" />
        <stop offset="78%" stop-color="#cfc9fc" />
        <stop offset="100%" stop-color="#9078f0" />
      </radialGradient>
    </defs>

    <g :clip-path="`url(#${clipId})`">
      <g :transform="parallaxGroupTransform(parallaxBack)">
        <g v-for="star in backStars" :key="star.id">
          <g
            class="hero-star"
            :class="{
              'hero-star--bright': star.glow,
              'hero-star--sparkle': star.sparkle,
              'hero-star-twinkle': star.twinkle,
            }"
            :style="twinkleAnimationStyle(star)"
          >
            <template v-if="star.sparkle">
              <circle
                :cx="star.x"
                :cy="star.y"
                :r="sparkleGlowRadius(star)"
                fill="url(#hero-star-glow-unified)"
              />
              <path
                class="hero-star-sparkle"
                :d="DECO_SPARKLE_PATH"
                :transform="sparkleTransform(star)"
                fill="url(#hero-star-sparkle-fill)"
              />
            </template>
            <template v-else>
              <circle
                v-if="star.glow"
                :cx="star.x"
                :cy="star.y"
                :r="star.glowR"
                fill="url(#hero-star-glow-unified)"
              />
              <circle
                v-else
                :cx="star.x"
                :cy="star.y"
                :r="star.r"
                fill="url(#hero-star-core)"
              />
            </template>
          </g>
        </g>
      </g>
      <g :transform="parallaxGroupTransform(parallaxMid)">
        <g v-for="star in midStars" :key="star.id">
          <g
            class="hero-star"
            :class="{
              'hero-star--bright': star.glow,
              'hero-star--sparkle': star.sparkle,
              'hero-star-twinkle': star.twinkle,
            }"
            :style="twinkleAnimationStyle(star)"
          >
            <template v-if="star.sparkle">
              <circle
                :cx="star.x"
                :cy="star.y"
                :r="sparkleGlowRadius(star)"
                fill="url(#hero-star-glow-unified)"
              />
              <path
                class="hero-star-sparkle"
                :d="DECO_SPARKLE_PATH"
                :transform="sparkleTransform(star)"
                fill="url(#hero-star-sparkle-fill)"
              />
            </template>
            <template v-else>
              <circle
                v-if="star.glow"
                :cx="star.x"
                :cy="star.y"
                :r="star.glowR"
                fill="url(#hero-star-glow-unified)"
              />
              <circle
                v-else
                :cx="star.x"
                :cy="star.y"
                :r="star.r"
                fill="url(#hero-star-core)"
              />
            </template>
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  DECO_SPARKLE_ARM,
  DECO_SPARKLE_PATH,
  DECO_SPARKLE_VIEW_SIZE,
  SPARKLE_GLOW_R_FACTOR,
} from '../config/decoSparkle.js'
import { useHeroSkyLayout } from '../composables/useHeroSkyLayout.js'
import { generateHeroStarfield } from '../utils/generateHeroStarfield.js'
import {
  applyStarfieldFloors,
  fallbackMinPx,
  readHeroStarFloorsPx,
} from '../utils/heroStarScreenFloor.js'
import { violatesHeroConstellation } from '../utils/heroConstellationExclusion.js'
import {
  buildTwinkleKeyframesCss,
  twinkleAnimationStyle,
} from '../utils/heroStarTwinkle.js'
import '../styles/heroStarMinRadius.css'
import '../styles/heroStarTwinkle.css'

const props = defineProps({
  parallaxBack: {
    type: Object,
    default: null,
  },
  parallaxMid: {
    type: Object,
    default: null,
  },
})

const STARFIELD_VIEWBOX_WIDTH = 100
const DECO_STAR_CENTER = DECO_SPARKLE_VIEW_SIZE / 2

const { layout, viewportWidth } = useHeroSkyLayout()

const svgRef = ref(null)
const svgWidthPx = ref(0)

const clipId = computed(() => `starfield-bounds-${layout.value.id}`)

const stars = computed(() => generateHeroStarfield(layout.value, viewportWidth.value))

const flooredStars = computed(() => {
  const el = svgRef.value
  const width = svgWidthPx.value || viewportWidth.value
  const floors = el
    ? readHeroStarFloorsPx(el)
    : {
        core: fallbackMinPx('core', viewportWidth.value),
        glow: fallbackMinPx('glow', viewportWidth.value),
        sparkle: fallbackMinPx('sparkle', viewportWidth.value),
      }

  return applyStarfieldFloors(
    stars.value,
    floors,
    width,
    STARFIELD_VIEWBOX_WIDTH,
    layout.value.starfieldSizeScale ?? 1,
    { sparkleArmMaxPx: layout.value.sparkleArmMaxPx },
  ).filter(
    (star) =>
      !violatesHeroConstellation(star, layout.value, {
        viewportWidth: width,
        svgWidthPx: width,
      }),
  )
})

const backStars = computed(() =>
  flooredStars.value.filter((star) => !star.glow && !star.sparkle),
)

const midStars = computed(() =>
  flooredStars.value.filter((star) => star.glow || star.sparkle),
)

const twinkleKeyframes = computed(() => buildTwinkleKeyframesCss(stars.value))

function parallaxGroupTransform(offset) {
  if (!offset || (!offset.x && !offset.y)) return undefined

  const width = svgWidthPx.value || viewportWidth.value
  if (!width) return undefined

  const unitsPerPx = STARFIELD_VIEWBOX_WIDTH / width
  const tx = offset.x * unitsPerPx
  const ty = offset.y * unitsPerPx

  return `translate(${tx.toFixed(4)} ${ty.toFixed(4)})`
}

function sparkleGlowRadius(star) {
  if (star.glow && star.glowR > 0) return star.glowR

  return +(star.sparkleScale * DECO_SPARKLE_ARM * SPARKLE_GLOW_R_FACTOR).toFixed(3)
}

function sparkleTransform(star) {
  return `translate(${star.x} ${star.y}) scale(${star.sparkleScale}) translate(${-DECO_STAR_CENTER} ${-DECO_STAR_CENTER})`
}

function syncSvgWidth() {
  svgWidthPx.value = svgRef.value?.getBoundingClientRect().width ?? viewportWidth.value
}

onMounted(() => {
  syncSvgWidth()
  window.addEventListener('resize', syncSvgWidth, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', syncSvgWidth)
})
</script>

<style scoped>
.hero-starfield {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-starfield :deep(.hero-star),
.hero-starfield :deep(.hero-star-twinkle) {
  transform-box: fill-box;
  transform-origin: center;
}
</style>
