<template>
  <div class="star-map-decor-wrap" aria-hidden="true">
    <svg
      class="star-map-decor"
      viewBox="-5 -5 110 110"
      overflow="visible"
    >
      <circle
        v-for="(ring, index) in rings"
        :key="`ring-${index}`"
        class="star-map-decor__ring"
        :cx="CX"
        :cy="CY"
        :r="ring.r"
        :style="{ strokeWidth: ring.strokeWidth }"
      />
      <line
        v-for="(line, index) in radialLines"
        :key="`radial-${index}`"
        class="star-map-decor__grid"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
      />
      <line
        v-for="(tick, index) in ticks"
        :key="`tick-${index}`"
        class="star-map-decor__tick"
        :x1="tick.x1"
        :y1="tick.y1"
        :x2="tick.x2"
        :y2="tick.y2"
      />
      <circle
        class="star-map-decor__outline"
        :cx="CX"
        :cy="CY"
        :r="OUTLINE_RADIUS"
      />
    </svg>
  </div>
</template>

<script setup>
const CX = 50
const CY = 50
const OUTER_RADIUS = 46
const OUTLINE_GAP = 1.2
const OUTLINE_RADIUS = OUTER_RADIUS + OUTLINE_GAP
const RING_COUNT = 8
const RADIAL_COUNT = 24
const RADIAL_STEP = 360 / RADIAL_COUNT
const TICK_COUNT = 144
const TICK_STEP = 360 / TICK_COUNT
const TICK_LENGTH = 1.1
const RING_STROKE_MAX = 8
const RING_STROKE_MIN = 2.2

const rings = Array.from({ length: RING_COUNT }, (_, index) => {
  const t = RING_COUNT > 1 ? index / (RING_COUNT - 1) : 0
  return {
    r: (OUTER_RADIUS * (RING_COUNT - index)) / RING_COUNT,
    strokeWidth: +(RING_STROKE_MAX - t * (RING_STROKE_MAX - RING_STROKE_MIN)).toFixed(2),
  }
})

function pointAt(cx, cy, radius, angleDeg) {
  const radians = (angleDeg * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  }
}

const radialLines = Array.from({ length: RADIAL_COUNT }, (_, index) => {
  const angle = RADIAL_STEP * index
  const end = pointAt(CX, CY, OUTER_RADIUS, angle)
  return {
    x1: CX,
    y1: CY,
    x2: end.x,
    y2: end.y,
  }
})

const ticks = Array.from({ length: TICK_COUNT }, (_, index) => {
  const angle = TICK_STEP * index
  const outer = pointAt(CX, CY, OUTER_RADIUS, angle)
  const inner = pointAt(CX, CY, OUTER_RADIUS - TICK_LENGTH, angle)
  return {
    x1: outer.x,
    y1: outer.y,
    x2: inner.x,
    y2: inner.y,
  }
})
</script>

<style scoped>
.star-map-decor-wrap {
  position: absolute;
  left: 50%;
  top: env(safe-area-inset-top, 0px);
  width: min(108.675vw, 265.65vmin);
  height: min(108.675vw, 265.65vmin);
  transform: translate(-50%, clamp(-40px, -7vh, -88px));
  overflow: visible;
  z-index: 0;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(
    to bottom,
    #000 0%,
    #000 38%,
    rgba(0, 0, 0, 0.55) 68%,
    rgba(0, 0, 0, 0.15) 86%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    #000 0%,
    #000 38%,
    rgba(0, 0, 0, 0.55) 68%,
    rgba(0, 0, 0, 0.15) 86%,
    transparent 100%
  );
}

.star-map-decor {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  opacity: 0.32;
}

.star-map-decor__ring {
  fill: none;
  stroke: #380FE9;
  vector-effect: non-scaling-stroke;
}

.star-map-decor__grid {
  fill: none;
  stroke: #380FE9;
  stroke-width: 4;
  vector-effect: non-scaling-stroke;
}

.star-map-decor__tick {
  fill: none;
  stroke: #380FE9;
  stroke-width: 4;
  vector-effect: non-scaling-stroke;
}

.star-map-decor__outline {
  fill: none;
  stroke: #380FE9;
  stroke-width: 12;
  vector-effect: non-scaling-stroke;
}
</style>
