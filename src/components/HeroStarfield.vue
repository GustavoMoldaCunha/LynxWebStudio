<template>
  <component :is="'style'">{{ twinkleKeyframes }}</component>
  <svg
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
    </defs>

    <g :clip-path="`url(#${clipId})`">
      <g v-for="star in stars" :key="star.id">
        <g
          class="hero-star"
          :class="{
            'hero-star--bright': star.glow,
            'hero-star-twinkle': star.twinkle,
          }"
          :style="twinkleAnimationStyle(star)"
        >
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
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { useHeroSkyLayout } from '../composables/useHeroSkyLayout.js'
import { generateHeroStarfield } from '../utils/generateHeroStarfield.js'
import {
  buildTwinkleKeyframesCss,
  twinkleAnimationStyle,
} from '../utils/heroStarTwinkle.js'
import '../styles/heroStarTwinkle.css'

const { layout } = useHeroSkyLayout()

const clipId = computed(() => `starfield-bounds-${layout.value.id}`)

const stars = computed(() => generateHeroStarfield(layout.value))

const twinkleKeyframes = computed(() => buildTwinkleKeyframesCss(stars.value))
</script>

<style scoped>
.hero-starfield {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
