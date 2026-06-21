<template>
  <div class="scroll-sparkle" aria-hidden="true">
    <div
      v-show="lineHeightPx > 0"
      class="scroll-sparkle__line"
      :style="lineStyle"
    >
      <SectionDecoLine class="scroll-sparkle__trail" orientation="vertical" />
    </div>
    <div
      v-show="lineHeightPx > 0"
      class="scroll-sparkle__star"
      :style="starStyle"
    >
      <DecoSparkle class="scroll-sparkle__icon" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import DecoSparkle from './DecoSparkle.vue'
import SectionDecoLine from './SectionDecoLine.vue'
import { getLenis } from '../composables/useLenis'

const STAR_SIZE_PX = 92
const STAR_LINE_GAP_PX = -8
const BOTTOM_INSET_PX = 32
const LERP_FACTOR = 0.08
const SNAP_THRESHOLD_PX = 0.5

const lineHeightPx = ref(0)

let currentLineHeightPx = 0
let currentScrollY = 0
let rafId = null
let onLenisScroll = null

const lineStyle = computed(() => ({
  height: `${lineHeightPx.value}px`,
}))

const starStyle = computed(() => ({
  top: `${lineHeightPx.value + STAR_LINE_GAP_PX}px`,
}))

function getMaxLineHeight() {
  return Math.max(
    0,
    window.innerHeight - BOTTOM_INSET_PX - STAR_SIZE_PX - STAR_LINE_GAP_PX,
  )
}

function getTargetLineHeight() {
  const maxLineHeight = getMaxLineHeight()
  if (maxLineHeight <= 0) return 0

  const lenis = getLenis()
  const maxScroll = lenis ? lenis.limit : document.body.scrollHeight - window.innerHeight
  if (maxScroll <= 0) return 0

  const scrollY = lenis ? currentScrollY : window.scrollY
  const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
  return progress * maxLineHeight
}

function tick() {
  const targetLineHeight = getTargetLineHeight()
  const diff = targetLineHeight - currentLineHeightPx

  if (Math.abs(diff) < SNAP_THRESHOLD_PX) {
    currentLineHeightPx = targetLineHeight
  } else {
    currentLineHeightPx += diff * LERP_FACTOR
  }

  lineHeightPx.value = currentLineHeightPx
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  const lenis = getLenis()

  if (lenis) {
    currentScrollY = lenis.scroll
    onLenisScroll = (instance) => {
      currentScrollY = instance.scroll
    }
    lenis.on('scroll', onLenisScroll)
  } else {
    currentScrollY = window.scrollY
  }

  currentLineHeightPx = getTargetLineHeight()
  lineHeightPx.value = currentLineHeightPx
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  const lenis = getLenis()
  if (lenis && onLenisScroll) {
    lenis.off('scroll', onLenisScroll)
    onLenisScroll = null
  }

  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
})
</script>

<style scoped>
.scroll-sparkle {
  position: fixed;
  top: 0;
  right: clamp(16px, 3vw, 40px);
  width: 92px;
  height: 100vh;
  height: 100dvh;
  z-index: 5;
  pointer-events: none;
}

.scroll-sparkle__line {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--deco-trail-thickness, 6px);
  transform: translateX(-50%);
}

.scroll-sparkle__trail {
  display: block;
}

.scroll-sparkle__star {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-sparkle__icon {
  display: block;
  width: 92px;
  height: 92px;
  color: #380FE9;
}

@media (max-width: 768px) {
  .scroll-sparkle {
    display: none;
  }
}
</style>
