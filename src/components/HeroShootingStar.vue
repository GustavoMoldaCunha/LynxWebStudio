<template>
  <div ref="rootRef" class="hero-shooting-star" aria-hidden="true">
    <div
      v-if="flying"
      class="hero-shooting-star__streak"
      :style="streakStyle"
      @animationend="onFlyEnd"
    />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'

/** Quiet gap between streaks (ms). */
const INTERVAL_MIN_MS = 4500
const INTERVAL_MAX_MS = 9000
/** Streak travel duration (ms). */
const FLIGHT_MIN_MS = 220
const FLIGHT_MAX_MS = 380

const rootRef = ref(null)
const flying = ref(false)
const streakStyle = shallowRef({})

let timeoutId = 0
let visible = true
let reducedMotion = false
let observer = null
let reducedMotionQuery = null

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function clearTimer() {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = 0
  }
}

function scheduleNext() {
  clearTimer()
  if (reducedMotion || !visible) return

  timeoutId = window.setTimeout(() => {
    timeoutId = 0
    launch()
  }, rand(INTERVAL_MIN_MS, INTERVAL_MAX_MS))
}

function launch() {
  if (reducedMotion || !visible || flying.value) return

  // Mostly from upper-right → down-left; occasional mirror from the left.
  // Keep paths diagonal (~25–48° from horizontal), avoid near-vertical streaks.
  const fromRight = Math.random() > 0.4
  const startX = fromRight ? rand(55, 94) : rand(6, 42)
  const startY = rand(3, 26)
  // CSS rotate: element +X is the travel axis (head leads).
  const angle = fromRight ? rand(132, 155) : rand(25, 48)
  const distance = rand(26, 42)
  const duration = rand(FLIGHT_MIN_MS, FLIGHT_MAX_MS)

  streakStyle.value = {
    top: `${startY}%`,
    left: `${startX}%`,
    '--travel': `${distance}vmin`,
    '--angle': `${angle}deg`,
    '--duration': `${(duration / 1000).toFixed(2)}s`,
  }
  flying.value = true
}

function onFlyEnd() {
  flying.value = false
  scheduleNext()
}

function onVisibilityChange() {
  if (document.hidden) {
    clearTimer()
    flying.value = false
    return
  }
  if (visible && !reducedMotion) scheduleNext()
}

function onMotionChange(event) {
  reducedMotion = event.matches
  if (reducedMotion) {
    clearTimer()
    flying.value = false
  } else if (visible) {
    scheduleNext()
  }
}

onMounted(() => {
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = reducedMotionQuery.matches
  reducedMotionQuery.addEventListener('change', onMotionChange)

  observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
      if (!visible) {
        clearTimer()
        flying.value = false
      } else if (!reducedMotion) {
        scheduleNext()
      }
    },
    { threshold: 0.05 },
  )

  if (rootRef.value) observer.observe(rootRef.value)

  document.addEventListener('visibilitychange', onVisibilityChange, { passive: true })

  if (!reducedMotion) scheduleNext()
})

onUnmounted(() => {
  clearTimer()
  observer?.disconnect()
  reducedMotionQuery?.removeEventListener('change', onMotionChange)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<style scoped>
.hero-shooting-star {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
  contain: layout style paint;
}

.hero-shooting-star__streak {
  position: absolute;
  width: clamp(56px, 9vw, 110px);
  height: 1.5px;
  margin: 0;
  border-radius: 999px;
  /* Trail only — no box-shadow (that blobbed the whole capsule). */
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(56, 15, 233, 0.25) 28%,
    rgba(107, 79, 240, 0.55) 55%,
    #cfc9fc 78%,
    #e8eeff 92%,
    #ffffff 100%
  );
  will-change: transform, opacity;
  animation: hero-shooting-star-fly var(--duration, 0.8s) linear forwards;
  pointer-events: none;
}

/* Head glow matches HeroStarfield radial palette. */
.hero-shooting-star__streak::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translate(40%, -50%);
  background: radial-gradient(
    circle,
    #ffffff 0%,
    #e8eeff 12%,
    #cfc9fc 28%,
    rgba(107, 79, 240, 0.7) 48%,
    rgba(56, 15, 233, 0.35) 68%,
    transparent 78%
  );
  pointer-events: none;
}

@keyframes hero-shooting-star-fly {
  0% {
    opacity: 0;
    transform: rotate(var(--angle, 135deg)) translate3d(0, 0, 0);
  }
  10% {
    opacity: 1;
  }
  78% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(var(--angle, 135deg)) translate3d(var(--travel), 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-shooting-star {
    display: none;
  }
}
</style>
