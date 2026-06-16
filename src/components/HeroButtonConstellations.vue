<template>
  <svg
    class="hero-btn-constellation"
    :class="`hero-btn-constellation--${side}`"
    :viewBox="viewBox"
    overflow="visible"
    aria-hidden="true"
  >
    <defs>
      <radialGradient
        :id="`${uid}-star-fill`"
        gradientUnits="objectBoundingBox"
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop offset="0%" stop-color="#FFFFF2" />
        <stop offset="26%" stop-color="#F8FFBC" />
        <stop offset="54%" stop-color="#F0FF1F" />
        <stop offset="100%" stop-color="#C8D818" />
      </radialGradient>
      <filter
        v-for="(node, nodeIndex) in nodes"
        :id="`${uid}-star-glow-${nodeIndex}`"
        :key="`glow-${nodeIndex}`"
        filterUnits="userSpaceOnUse"
        :x="node.x - node.r * 6"
        :y="node.y - node.r * 6"
        :width="node.r * 12"
        :height="node.r * 12"
        color-interpolation-filters="sRGB"
      >
        <feGaussianBlur
          in="SourceGraphic"
          :stdDeviation="glowStdDeviations(node).halo"
          edgeMode="duplicate"
          result="halo"
        />
        <feGaussianBlur
          in="SourceGraphic"
          :stdDeviation="glowStdDeviations(node).core"
          edgeMode="duplicate"
          result="core"
        />
        <feMerge>
          <feMergeNode in="halo" />
          <feMergeNode in="core" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <line
      v-for="(edge, edgeIndex) in edges"
      :key="`edge-${edgeIndex}`"
      class="hero-btn-constellation__line"
      :style="edgeStyle(edge, edgeIndex)"
      :x1="pointAt(edge[0]).x"
      :y1="pointAt(edge[0]).y"
      :x2="pointAt(edge[1]).x"
      :y2="pointAt(edge[1]).y"
    />

    <g
      v-for="(node, nodeIndex) in nodes"
      :key="`node-${nodeIndex}`"
      class="hero-btn-constellation__node-group"
      :style="nodeStyle(nodeIndex)"
    >
      <circle
        class="hero-btn-constellation__node"
        :class="{ 'hero-btn-constellation__node--primary': node.primary }"
        :fill="`url(#${uid}-star-fill)`"
        :filter="nodeFilter(nodeIndex)"
        :cx="node.x"
        :cy="node.y"
        :r="node.r"
      />
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  side: {
    type: String,
    required: true,
    validator: (value) => value === 'left' || value === 'right',
  },
})

const uid = `hero-btn-constellation-${props.side}`

const leftConfig = {
  viewBox: '0 0 96 80',
  anchor: { x: 99, y: 40 },
  nodes: [
    { x: 11, y: 7, r: 6.2, primary: true },
    { x: 3, y: 37, r: 4.55 },
    { x: 24, y: 66, r: 4.85 },
  ],
  edges: [
    ['anchor', 0],
    [0, 1],
    [1, 2],
  ],
}

const rightConfig = {
  viewBox: '0 0 96 80',
  anchor: { x: -3, y: 40 },
  nodes: [
    { x: 61, y: 11, r: 4.45 },
    { x: 74, y: 24, r: 6, primary: true },
    { x: 87, y: 53, r: 4.75 },
  ],
  edges: [
    ['anchor', 0],
    [0, 1],
    [1, 2],
  ],
}

const SEGMENT_DRAW_DURATION = 0.42
const HERO_VIEWBOX_WIDTH = 100
const LOCAL_VIEWBOX_WIDTH = 96
const SOLO_STAR_MEDIUM_RADIUS = 0.11
const SOLO_STAR_LARGE_RADIUS = 0.22

const LOOSE_STAR_GLOW = {
  solo: { halo: 0.16, core: 0.05, refR: 0.1 },
  medium: { halo: 0.14, core: 0.045, refR: 0.15 },
  large: { halo: 0.28, core: 0.08, refR: 0.22 },
}

const config = computed(() => (props.side === 'left' ? leftConfig : rightConfig))
const viewBox = computed(() => config.value.viewBox)
const nodes = computed(() => config.value.nodes)
const edges = computed(() => config.value.edges)
const anchor = computed(() => config.value.anchor)

function pointAt(id) {
  if (id === 'anchor') {
    return anchor.value
  }

  return nodes.value[id]
}

function edgeLength(edge) {
  const a = pointAt(edge[0])
  const b = pointAt(edge[1])
  return Math.hypot(b.x - a.x, b.y - a.y)
}

function edgeStyle(edge, edgeIndex) {
  const length = edgeLength(edge)
  return {
    '--line-length': length,
    '--line-delay': `${edgeIndex * SEGMENT_DRAW_DURATION}s`,
    '--line-duration': `${SEGMENT_DRAW_DURATION}s`,
  }
}

function normalizedLooseRadius(node) {
  return node.r * (HERO_VIEWBOX_WIDTH / LOCAL_VIEWBOX_WIDTH)
}

function glowTierForNode(node) {
  const normalizedR = normalizedLooseRadius(node)

  if (normalizedR >= SOLO_STAR_LARGE_RADIUS) {
    return LOOSE_STAR_GLOW.large
  }

  if (normalizedR >= SOLO_STAR_MEDIUM_RADIUS) {
    return LOOSE_STAR_GLOW.medium
  }

  return LOOSE_STAR_GLOW.solo
}

function glowStdDeviations(node) {
  const tier = glowTierForNode(node)
  const scale = node.r / (tier.refR * (LOCAL_VIEWBOX_WIDTH / HERO_VIEWBOX_WIDTH))

  return {
    halo: +(tier.halo * scale).toFixed(3),
    core: +(tier.core * scale).toFixed(3),
  }
}

function nodeFilter(nodeIndex) {
  return `url(#${uid}-star-glow-${nodeIndex})`
}

function nodeStyle(nodeIndex) {
  const sideSign = props.side === 'left' ? -1 : 1
  const drift = [1.15, 0.85, 1.35][nodeIndex] ?? 1

  return {
    '--float-delay': `${(nodeIndex * 0.52) + (props.side === 'right' ? 0.18 : 0)}s`,
    '--float-offset': `${sideSign * (nodeIndex % 2 === 0 ? -1 : 1) * drift}px`,
  }
}
</script>

<style scoped>
.hero-btn-constellation {
  position: absolute;
  top: 50%;
  display: block;
  width: clamp(104px, 13vw, 152px);
  height: clamp(88px, 10.5vh, 124px);
  overflow: visible;
  pointer-events: none;
  z-index: 0;
}

.hero-btn-constellation--left {
  right: calc(100% - 3px);
  transform: translateY(-50%);
}

.hero-btn-constellation--right {
  left: calc(100% - 3px);
  transform: translateY(-50%);
}

.hero-btn-constellation__line {
  stroke: #f0ff1f;
  stroke-width: 0.75;
  stroke-linecap: round;
  fill: none;
  opacity: 0.72;
  stroke-dasharray: var(--line-length);
  stroke-dashoffset: var(--line-length);
  transition:
    stroke-dashoffset var(--line-duration) cubic-bezier(0.33, 1, 0.68, 1) var(--line-delay),
    opacity 0.3s ease var(--line-delay);
}

.hero-btn-constellation__node-group {
  transform-box: fill-box;
  transform-origin: center;
  animation: hero-btn-constellation-float 4.8s ease-in-out var(--float-delay) infinite;
  will-change: transform;
}

.hero-btn-constellation__node {
  transform-box: fill-box;
  transform-origin: center;
}

.hero-btn-constellation__node-group:has(.hero-btn-constellation__node--primary) {
  animation-duration: 5.6s;
}

@keyframes hero-btn-constellation-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(var(--float-offset));
  }
}

@media (max-width: 480px) {
  .hero-btn-constellation {
    width: clamp(84px, 21vw, 112px);
    height: clamp(72px, 18vw, 96px);
  }

  .hero-btn-constellation--left {
    right: calc(100% - 2px);
    transform: translateY(-50%);
  }

  .hero-btn-constellation--right {
    left: calc(100% - 2px);
    transform: translateY(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-btn-constellation__node-group {
    animation: none;
    will-change: auto;
  }

  .hero-btn-constellation__line {
    transition: none;
  }
}
</style>
