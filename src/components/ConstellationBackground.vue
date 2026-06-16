<template>
  <svg
    ref="rootRef"
    class="constellation-bg"
    :style="parallaxSvgStyle"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
    overflow="visible"
    aria-hidden="true"
  >
    <defs>
      <radialGradient
        id="constellation-star-fill-cluster"
        gradientUnits="objectBoundingBox"
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="22%" stop-color="#FDFFE8" />
        <stop offset="48%" stop-color="#F5FF7A" />
        <stop offset="78%" stop-color="#F0FF1F" />
        <stop offset="100%" stop-color="#D4E015" />
      </radialGradient>
      <radialGradient
        id="constellation-star-fill-solo"
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
      <radialGradient
        id="constellation-star-fill-bg"
        gradientUnits="objectBoundingBox"
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="35%" stop-color="#FDFFE8" />
        <stop offset="72%" stop-color="#F8FFBC" />
        <stop offset="100%" stop-color="#F0FF1F" stop-opacity="0.85" />
      </radialGradient>
      <radialGradient
        id="constellation-sparkle-halo-fill"
        gradientUnits="objectBoundingBox"
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="38%" stop-color="#F8FFAA" />
        <stop offset="72%" stop-color="#F0FF1F" />
        <stop offset="100%" stop-color="#F0FF1F" stop-opacity="0" />
      </radialGradient>
      <filter
        id="constellation-star-glow"
        filterUnits="objectBoundingBox"
        x="-400%"
        y="-400%"
        width="900%"
        height="900%"
        color-interpolation-filters="sRGB"
      >
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0.22"
          edgeMode="duplicate"
          result="halo"
        />
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0.06"
          edgeMode="duplicate"
          result="core"
        />
        <feMerge>
          <feMergeNode in="halo" />
          <feMergeNode in="core" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter
        id="constellation-star-glow-solo"
        filterUnits="objectBoundingBox"
        x="-400%"
        y="-400%"
        width="900%"
        height="900%"
        color-interpolation-filters="sRGB"
      >
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0.16"
          edgeMode="duplicate"
          result="halo"
        />
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0.05"
          edgeMode="duplicate"
          result="core"
        />
        <feMerge>
          <feMergeNode in="halo" />
          <feMergeNode in="core" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter
        id="constellation-star-halo-soft"
        filterUnits="objectBoundingBox"
        x="-500%"
        y="-500%"
        width="1100%"
        height="1100%"
        color-interpolation-filters="sRGB"
      >
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0.52"
          edgeMode="duplicate"
        />
      </filter>
      <filter
        id="constellation-bg-star-glow-medium"
        filterUnits="objectBoundingBox"
        x="-500%"
        y="-500%"
        width="1100%"
        height="1100%"
        color-interpolation-filters="sRGB"
      >
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0.14"
          edgeMode="duplicate"
          result="halo"
        />
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0.045"
          edgeMode="duplicate"
          result="core"
        />
        <feMerge>
          <feMergeNode in="halo" />
          <feMergeNode in="core" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter
        id="constellation-bg-star-glow-large"
        filterUnits="objectBoundingBox"
        x="-600%"
        y="-600%"
        width="1300%"
        height="1300%"
        color-interpolation-filters="sRGB"
      >
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0.28"
          edgeMode="duplicate"
          result="halo"
        />
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0.08"
          edgeMode="duplicate"
          result="core"
        />
        <feMerge>
          <feMergeNode in="halo" />
          <feMergeNode in="core" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter
        id="constellation-catalog-label-blur"
        filterUnits="userSpaceOnUse"
        x="-2"
        y="-2"
        width="104"
        height="104"
        color-interpolation-filters="sRGB"
      >
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0.05"
          edgeMode="duplicate"
        />
      </filter>
    </defs>
    <circle
      v-for="(star, bgIndex) in backgroundStars"
      :key="`bg-${bgIndex}`"
      class="constellation-bg__bg-star"
      :class="backgroundStarClasses(star)"
      :style="backgroundStarStyle(star)"
      :filter="backgroundStarFilter(star)"
      fill="url(#constellation-star-fill-bg)"
      :cx="star.x"
      :cy="star.y"
      :r="clampLooseStarRadius(star.r)"
    />
    <text
      v-for="(label, labelIndex) in backgroundStarLabels"
      :key="`bg-label-${labelIndex}`"
      class="constellation-bg__catalog-label"
      filter="url(#constellation-catalog-label-blur)"
      :x="label.x + label.dx"
      :y="label.y + label.dy"
      :font-size="catalogLabelFontSize(label)"
      :letter-spacing="catalogLabelLetterSpacing()"
    >{{ label.text }}</text>
    <g
      v-for="cluster in field.clusters"
      :key="cluster.id"
      :id="constellationDomId(cluster.id)"
      :data-name="constellationDomName(cluster.id)"
      :ref="(el) => setClusterRef(cluster.id, el)"
      class="constellation-bg__cluster"
      :transform="clusterTransform(cluster)"
      :style="clusterClampStyle(cluster)"
    >
      <line
        v-for="(edge, edgeIndex) in cluster.edges"
        :key="`${cluster.id}-edge-${edgeIndex}`"
        class="constellation-bg__line"
        :x1="cluster.nodes[edge[0]].x"
        :y1="cluster.nodes[edge[0]].y"
        :x2="cluster.nodes[edge[1]].x"
        :y2="cluster.nodes[edge[1]].y"
      />
      <circle
        v-for="(node, nodeIndex) in cluster.nodes"
        :key="`${cluster.id}-node-${nodeIndex}`"
        class="constellation-bg__node constellation-bg__node--cluster"
        :class="starClasses(cluster.id, nodeIndex)"
        :style="starMotionStyle(cluster.id, nodeIndex)"
        fill="url(#constellation-star-fill-cluster)"
        filter="url(#constellation-star-glow)"
        :cx="node.x"
        :cy="node.y"
        :r="constellationNodeRadius(cluster, nodeIndex)"
      />
    </g>
    <text
      v-for="item in constellationCatalogLabels"
      :key="item.key"
      class="constellation-bg__catalog-label"
      filter="url(#constellation-catalog-label-blur)"
      :x="item.x"
      :y="item.y"
      :font-size="item.fontSize"
      :letter-spacing="catalogLabelLetterSpacing()"
    >{{ item.text }}</text>
    <circle
      v-for="(star, starIndex) in field.isolatedStars"
      :key="`solo-${starIndex}`"
      class="constellation-bg__node constellation-bg__node--solo"
      :class="starClasses('solo', starIndex)"
      :style="soloStarStyle(star, starIndex)"
      fill="url(#constellation-star-fill-solo)"
      :filter="soloStarFilter(star)"
      :cx="star.x"
      :cy="star.y"
      :r="clampLooseStarRadius(star.r)"
    />
    <circle
      v-for="halo in activeSparkleHalos"
      :key="`sparkle-halo-${halo.key}`"
      class="constellation-bg__sparkle-halo"
      :style="{ '--sparkle-duration': `${SPARKLE_ANIMATION_S}s` }"
      :cx="halo.x"
      :cy="halo.y"
      :r="halo.haloR"
      fill="url(#constellation-sparkle-halo-fill)"
      filter="url(#constellation-star-halo-soft)"
    />
  </svg>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { constellationField } from '../config/constellationClusters.js'
import {
  backgroundStarLabels,
  constellationNodeLabels,
  HERO_CATALOG_LABEL_LETTER_SPACING,
} from '../config/heroStarCatalogLabels.js'
import {
  constellationNodeRadius,
  constellationNodeWorldRadius,
  LOOSE_STAR_MAX_RADIUS,
} from '../config/starScaleHierarchy.js'

const clusterNodeLabelsMap = constellationNodeLabels.reduce((map, label) => {
  if (!map.has(label.clusterId)) {
    map.set(label.clusterId, [])
  }

  map.get(label.clusterId).push(label)
  return map
}, new Map())

function clusterNodeLabelsFor(clusterId) {
  return clusterNodeLabelsMap.get(clusterId) ?? []
}

function catalogLabelFontSize(label) {
  return label.fontSize
}

function catalogLabelLetterSpacing() {
  return HERO_CATALOG_LABEL_LETTER_SPACING
}

function catalogLabelWorldPosition(cluster, label) {
  const position = getClusterPosition(cluster)
  const node = cluster.nodes[label.nodeIndex]

  return {
    x: position.x + (node.x + label.dx) * cluster.scale,
    y: position.y + (node.y + label.dy) * cluster.scale,
  }
}

const constellationCatalogLabels = computed(() => {
  clusterLayouts.value

  return props.field.clusters.flatMap((cluster) =>
    clusterNodeLabelsFor(cluster.id).map((label) => {
      const position = catalogLabelWorldPosition(cluster, label)

      return {
        key: `${cluster.id}-${label.nodeIndex}`,
        text: label.text,
        x: position.x,
        y: position.y,
        fontSize: label.fontSize,
      }
    }),
  )
})

const props = defineProps({
  field: {
    type: Object,
    default: () => constellationField,
  },
})

const CONSTELLATION_DOM_LABELS = {
  'top-left': { id: 'constellation-top-left', name: 'Top Left' },
  'top-right': { id: 'constellation-top-right', name: 'Top Right' },
  'middle-left': { id: 'constellation-middle-left', name: 'Middle Left' },
  'middle-right': { id: 'constellation-middle-right', name: 'Middle Right' },
}

function constellationDomId(clusterId) {
  return CONSTELLATION_DOM_LABELS[clusterId]?.id ?? `constellation-${clusterId}`
}

function constellationDomName(clusterId) {
  return CONSTELLATION_DOM_LABELS[clusterId]?.name ?? clusterId
}

const SPARKLE_DURATION_MS = 2800
const SPARKLE_ANIMATION_S = SPARKLE_DURATION_MS / 1000
const SPARKLE_TICK_MS = 100
const SPARKLE_MIN_ACTIVE = 10
const SPARKLE_MAX_ACTIVE = 22
const PARALLAX_MAX_SHIFT_PX = 5
const PARALLAX_LERP = 0.16
const PARALLAX_SCROLL_WEIGHT = 0.28

const rootRef = ref(null)
const clusterRefs = new Map()
const clusterLayouts = ref({})
const parallax = ref({ x: 0, y: 0 })
const parallaxMotionReduced = ref(false)

const backgroundStars = computed(() => props.field.backgroundStars ?? [])

const parallaxSvgStyle = computed(() => {
  if (parallaxMotionReduced.value) {
    return null
  }

  const x = parallax.value.x * PARALLAX_MAX_SHIFT_PX
  const y = parallax.value.y * PARALLAX_MAX_SHIFT_PX

  return {
    transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`,
  }
})
const activeSparkles = ref(new Set())
const motionConfigCache = new Map()
const sparkleCooldowns = new Map()
let sparkleRegistry = []
let sparkleTimer = null
let sparkleStaggerTimers = []
let parallaxTarget = { x: 0, y: 0 }
let parallaxFrame = null
let parallaxHero = null
let parallaxCoarsePointer = null
let parallaxPointerActive = false
let parallaxLastPointerAt = 0

function clampParallax(value) {
  return Math.max(-1, Math.min(1, value))
}

function setParallaxTarget(x, y) {
  parallaxTarget = { x, y }

  if (parallaxFrame !== null) {
    return
  }

  const step = () => {
    const dx = parallaxTarget.x - parallax.value.x
    const dy = parallaxTarget.y - parallax.value.y

    if (Math.abs(dx) < 0.0005 && Math.abs(dy) < 0.0005) {
      parallax.value = { ...parallaxTarget }
      parallaxFrame = null
      return
    }

    parallax.value = {
      x: parallax.value.x + dx * PARALLAX_LERP,
      y: parallax.value.y + dy * PARALLAX_LERP,
    }
    parallaxFrame = requestAnimationFrame(step)
  }

  parallaxFrame = requestAnimationFrame(step)
}

function parallaxFromPointer(clientX, clientY) {
  if (!parallaxHero) {
    return
  }

  const rect = parallaxHero.getBoundingClientRect()

  if (!rect.width || !rect.height) {
    return
  }

  const x = clampParallax(((clientX - rect.left) / rect.width - 0.5) * 2)
  const y = clampParallax(((clientY - rect.top) / rect.height - 0.5) * 2)

  parallaxPointerActive = true
  parallaxLastPointerAt = Date.now()
  setParallaxTarget(x, y)
}

function parallaxFromViewport() {
  if (!parallaxHero) {
    return
  }

  const rect = parallaxHero.getBoundingClientRect()
  const heroMidY = rect.top + rect.height * 0.5
  const viewMidY = window.innerHeight * 0.5
  const scrollY = clampParallax((viewMidY - heroMidY) / (window.innerHeight * 0.72))
  const scrollX = clampParallax((window.innerWidth * 0.5 - (rect.left + rect.width * 0.5)) / (window.innerWidth * 0.72))

  if (parallaxPointerActive && Date.now() - parallaxLastPointerAt < 1200) {
    setParallaxTarget(
      parallaxTarget.x,
      parallaxTarget.y * (1 - PARALLAX_SCROLL_WEIGHT) + scrollY * PARALLAX_SCROLL_WEIGHT,
    )
    return
  }

  setParallaxTarget(scrollX, scrollY)
}

function onParallaxPointerMove(event) {
  if (parallaxMotionReduced.value) {
    return
  }

  const point = event.touches?.[0] ?? event

  if (point.clientX == null || point.clientY == null) {
    return
  }

  parallaxFromPointer(point.clientX, point.clientY)
}

function onParallaxScroll() {
  if (parallaxMotionReduced.value) {
    return
  }

  parallaxFromViewport()
}

function startParallax() {
  parallaxHero = rootRef.value?.parentElement ?? null
  parallaxMotionReduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  parallaxCoarsePointer = window.matchMedia('(pointer: coarse)')

  if (parallaxMotionReduced.value) {
    return
  }

  window.addEventListener('mousemove', onParallaxPointerMove, { passive: true })
  window.addEventListener('touchmove', onParallaxPointerMove, { passive: true })
  window.addEventListener('scroll', onParallaxScroll, { passive: true })
  window.addEventListener('resize', onParallaxScroll, { passive: true })

  if (parallaxCoarsePointer.matches) {
    parallaxFromViewport()
  }
}

function stopParallax() {
  window.removeEventListener('mousemove', onParallaxPointerMove)
  window.removeEventListener('touchmove', onParallaxPointerMove)
  window.removeEventListener('scroll', onParallaxScroll)
  window.removeEventListener('resize', onParallaxScroll)

  if (parallaxFrame !== null) {
    cancelAnimationFrame(parallaxFrame)
    parallaxFrame = null
  }

  parallaxHero = null
  parallaxPointerActive = false
}

function setClusterRef(id, el) {
  if (el) {
    clusterRefs.set(id, el)
    return
  }

  clusterRefs.delete(id)
}

function getClusterPosition(cluster) {
  const svgRect = rootRef.value?.getBoundingClientRect()
  const unitX = svgRect?.width ? 100 / svgRect.width : 1
  const unitY = svgRect?.height ? 100 / svgRect.height : 1
  const layout = clusterLayouts.value[cluster.id] || { dxPx: 0, dyPx: 0 }

  return {
    x: cluster.x + layout.dxPx * unitX,
    y: cluster.y + layout.dyPx * unitY,
  }
}

function clusterTransform(cluster) {
  const position = getClusterPosition(cluster)
  return `translate(${position.x} ${position.y}) scale(${cluster.scale})`
}

function clusterClampStyle(cluster) {
  const layout = clusterLayouts.value[cluster.id]

  if (!layout) {
    return undefined
  }

  return {
    left: `${layout.left}px`,
    top: `${layout.top}px`,
  }
}

function ensureLayoutEntry(layouts, clusterId) {
  if (!layouts[clusterId]) {
    layouts[clusterId] = { dxPx: 0, dyPx: 0, left: 0, top: 0 }
  }

  return layouts[clusterId]
}

function rectsOverlap(rectA, rectB) {
  return (
    rectA.left < rectB.right &&
    rectA.right > rectB.left &&
    rectA.top < rectB.bottom &&
    rectA.bottom > rectB.top
  )
}

async function resolveClusterOverlaps(layouts) {
  const clusters = props.field.clusters

  for (let pass = 0; pass < 10; pass++) {
    let moved = false
    clusterLayouts.value = { ...layouts }
    await nextTick()
    await new Promise((resolve) => requestAnimationFrame(resolve))

    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        const elA = clusterRefs.get(clusters[i].id)
        const elB = clusterRefs.get(clusters[j].id)

        if (!elA || !elB) {
          continue
        }

        const rectA = elA.getBoundingClientRect()
        const rectB = elB.getBoundingClientRect()

        if (!rectsOverlap(rectA, rectB)) {
          continue
        }

        const overlapX = Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left)
        const overlapY = Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top)
        const layoutA = ensureLayoutEntry(layouts, clusters[i].id)
        const layoutB = ensureLayoutEntry(layouts, clusters[j].id)

        if (overlapX <= overlapY) {
          const push = overlapX / 2 + 2

          if (rectA.left <= rectB.left) {
            layoutA.dxPx -= push
            layoutB.dxPx += push
          } else {
            layoutA.dxPx += push
            layoutB.dxPx -= push
          }
        } else {
          const push = overlapY / 2 + 2

          if (rectA.top <= rectB.top) {
            layoutA.dyPx -= push
            layoutB.dyPx += push
          } else {
            layoutA.dyPx += push
            layoutB.dyPx -= push
          }
        }

        moved = true
      }
    }

    if (!moved) {
      break
    }
  }

  return layouts
}

async function clampConstellationsToHero() {
  await nextTick()
  await new Promise((resolve) => requestAnimationFrame(resolve))

  const hero =
    rootRef.value?.closest('.banner, .hero') ?? document.querySelector('.banner, .hero')

  if (!hero) {
    return
  }

  const heroRect = hero.getBoundingClientRect()
  const heroW = hero.offsetWidth
  const heroH = hero.offsetHeight
  let nextLayouts = { ...clusterLayouts.value }

  for (const cluster of props.field.clusters) {
    const constellation = clusterRefs.get(cluster.id)

    if (!constellation) {
      continue
    }

    const rect = constellation.getBoundingClientRect()
    const elW = rect.width
    const elH = rect.height
    const previous = ensureLayoutEntry(nextLayouts, cluster.id)
    const currentLeft = rect.left - heroRect.left
    const currentTop = rect.top - heroRect.top
    const maxLeft = Math.max(0, heroW - elW)
    const maxTop = Math.max(0, heroH - elH)
    const left = Math.max(0, Math.min(currentLeft, maxLeft))
    const top = Math.max(0, Math.min(currentTop, maxTop))

    nextLayouts[cluster.id] = {
      dxPx: previous.dxPx + (left - currentLeft),
      dyPx: previous.dyPx + (top - currentTop),
      left,
      top,
    }
  }

  clusterLayouts.value = nextLayouts
  nextLayouts = await resolveClusterOverlaps(nextLayouts)
  clusterLayouts.value = nextLayouts
}

async function runClusterClamp() {
  clusterLayouts.value = {}
  await clampConstellationsToHero()
  await nextTick()
  await clampConstellationsToHero()
  buildSparkleRegistry()
}

let clusterResizeObserver = null

function starKey(seed, index) {
  return `${seed}:${index}`
}

function starHash(seed) {
  let hash = 0

  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }

  return Math.abs(hash)
}

function getStarMotionConfig(seed, index) {
  const key = starKey(seed, index)

  if (motionConfigCache.has(key)) {
    return motionConfigCache.get(key)
  }

  const h = starHash(`${seed}-${index}`)

  if (h % 100 >= 58) {
    motionConfigCache.set(key, null)
    return null
  }

  const scaleSpread = 0.035 + (h % 4) / 100
  const config = {
    key,
    duration: 6.5 + (h % 41) / 10,
    delay: (h % 97) / 10,
    scaleMin: +(1 - scaleSpread).toFixed(3),
    scaleMax: +(1 + scaleSpread).toFixed(3),
  }

  motionConfigCache.set(key, config)
  return config
}

function starClasses(seed, index) {
  const motion = getStarMotionConfig(seed, index)

  return {
    'constellation-bg__node--alive': Boolean(motion),
  }
}

const activeSparkleHalos = computed(() => {
  return [...activeSparkles.value]
    .map((key) => sparkleRegistry.find((candidate) => candidate.key === key))
    .filter(Boolean)
})

function sparkleZone(x, y) {
  const col = Math.min(3, Math.floor(x / 25))
  const row = Math.min(3, Math.floor(y / 25))

  return row * 4 + col
}

function registerSparkleCandidate(key, x, y, r, hash, kind, clusterId = null) {
  const eligibilityThreshold = kind === 'cluster' ? 88 : 58

  if (hash % 100 >= eligibilityThreshold) {
    return
  }

  sparkleRegistry.push({
    key,
    x,
    y,
    r,
    haloR: r * 2.35,
    zone: sparkleZone(x, y),
    kind,
    clusterId,
  })
}

function buildSparkleRegistry() {
  sparkleRegistry = []

  for (const cluster of props.field.clusters) {
    cluster.nodes.forEach((node, nodeIndex) => {
      const key = starKey(cluster.id, nodeIndex)
      const hash = starHash(`${cluster.id}-${nodeIndex}-sparkle`)
      const position = getClusterPosition(cluster)
      const x = position.x + node.x * cluster.scale
      const y = position.y + node.y * cluster.scale

      registerSparkleCandidate(
        key,
        x,
        y,
        constellationNodeWorldRadius(cluster, nodeIndex),
        hash,
        'cluster',
        cluster.id,
      )
    })
  }

  props.field.isolatedStars.forEach((star, starIndex) => {
    const key = starKey('solo', starIndex)
    const hash = starHash(`solo-${starIndex}-sparkle`)

    registerSparkleCandidate(key, star.x, star.y, star.r, hash, 'solo')
  })
}

function activeSparkleKinds() {
  const counts = { cluster: 0, solo: 0 }

  for (const key of activeSparkles.value) {
    const entry = sparkleRegistry.find((candidate) => candidate.key === key)

    if (entry) {
      counts[entry.kind] += 1
    }
  }

  return counts
}

function activeSparkleClusterIds() {
  const clusterIds = new Set()

  for (const key of activeSparkles.value) {
    const entry = sparkleRegistry.find((candidate) => candidate.key === key)

    if (entry?.clusterId) {
      clusterIds.add(entry.clusterId)
    }
  }

  return clusterIds
}

function starMotionStyle(seed, index) {
  const config = getStarMotionConfig(seed, index)

  if (!config) {
    return null
  }

  return {
    '--alive-scale-min': config.scaleMin.toFixed(3),
    '--alive-scale-mid': '1',
    '--alive-scale-max': config.scaleMax.toFixed(3),
    '--alive-duration': `${config.duration}s`,
    '--alive-delay': `${config.delay}s`,
  }
}

function soloStarStyle(star, index) {
  const motion = starMotionStyle('solo', index)

  if (!motion) {
    return { opacity: star.opacity ?? 0.62 }
  }

  return {
    ...motion,
    opacity: star.opacity ?? 0.62,
  }
}

const BG_STAR_MEDIUM_RADIUS = 0.16
const BG_STAR_LARGE_RADIUS = 0.22
const SOLO_STAR_MEDIUM_RADIUS = 0.11

function clampLooseStarRadius(radius) {
  return Math.min(radius, LOOSE_STAR_MAX_RADIUS)
}

function backgroundStarClasses(star) {
  return {
    'constellation-bg__bg-star--twinkle': Boolean(star.twinkle),
    'constellation-bg__bg-star--medium': star.r >= BG_STAR_MEDIUM_RADIUS && star.r < BG_STAR_LARGE_RADIUS,
    'constellation-bg__bg-star--large': star.r >= BG_STAR_LARGE_RADIUS,
  }
}

function backgroundStarFilter(star) {
  if (star.r >= BG_STAR_LARGE_RADIUS) {
    return 'url(#constellation-bg-star-glow-large)'
  }

  if (star.r >= BG_STAR_MEDIUM_RADIUS) {
    return 'url(#constellation-bg-star-glow-medium)'
  }

  return null
}

function soloStarFilter(star) {
  if (star.r >= BG_STAR_LARGE_RADIUS) {
    return 'url(#constellation-bg-star-glow-large)'
  }

  if (star.r >= SOLO_STAR_MEDIUM_RADIUS) {
    return 'url(#constellation-bg-star-glow-medium)'
  }

  return 'url(#constellation-star-glow-solo)'
}

function backgroundStarStyle(star) {
  const opacity = star.opacity ?? 0.7
  const style = {
    '--star-opacity': opacity,
  }

  if (star.twinkle) {
    style['--twinkle-duration'] = `${star.twinkleDuration ?? 4}s`
    style['--twinkle-delay'] = `${star.twinkleDelay ?? 0}s`
  }

  return style
}

function activeSparkleZones() {
  const zones = new Set()

  for (const key of activeSparkles.value) {
    const entry = sparkleRegistry.find((candidate) => candidate.key === key)

    if (entry) {
      zones.add(entry.zone)
    }
  }

  return zones
}

function pickSparkleTarget(excludedKeys = new Set(), preferKind = null) {
  const now = Date.now()
  const occupiedZones = activeSparkleZones()
  const activeKinds = activeSparkleKinds()
  const activeClusterIds = activeSparkleClusterIds()
  const available = sparkleRegistry.filter((candidate) => {
    if (activeSparkles.value.has(candidate.key) || excludedKeys.has(candidate.key)) {
      return false
    }

    return (sparkleCooldowns.get(candidate.key) || 0) <= now
  })

  if (!available.length) {
    return null
  }

  const zoneTallies = new Map()

  for (const candidate of available) {
    zoneTallies.set(candidate.zone, (zoneTallies.get(candidate.zone) || 0) + 1)
  }

  const vacantZones = [...zoneTallies.keys()].filter((zone) => !occupiedZones.has(zone))
  let pool = vacantZones.length
    ? available.filter((candidate) => vacantZones.includes(candidate.zone))
    : available

  if (preferKind) {
    const preferredPool = pool.filter((candidate) => candidate.kind === preferKind)

    if (preferredPool.length) {
      pool = preferredPool
    }
  }

  if (pool.length > 1) {
    const weights = pool.map((candidate) => {
      const zoneWeight = occupiedZones.has(candidate.zone) ? 1 : 3
      const spreadWeight = 1 + (starHash(`${candidate.key}-spread`) % 3)
      const underrepresentedKind =
        candidate.kind === 'cluster'
          ? activeKinds.cluster <= activeKinds.solo
          : activeKinds.solo <= activeKinds.cluster
      const kindWeight = underrepresentedKind ? 2.8 : 1
      const clusterWeight =
        candidate.kind === 'cluster' && candidate.clusterId && activeClusterIds.has(candidate.clusterId)
          ? 0.35
          : 1

      return zoneWeight * spreadWeight * kindWeight * clusterWeight
    })
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
    let roll = starHash(`pick-${now}-${pool.length}-${preferKind || 'any'}`) % totalWeight

    for (let index = 0; index < pool.length; index++) {
      roll -= weights[index]

      if (roll < 0) {
        return pool[index].key
      }
    }
  }

  const pickIndex = starHash(`pick-${now}-${pool.length}-${preferKind || 'any'}`) % pool.length

  return pool[pickIndex].key
}

function preferredSparkleKindForBurst(index, burstCount, pickedKinds) {
  const hasClusterPick = pickedKinds.has('cluster')
  const hasSoloPick = pickedKinds.has('solo')
  const activeKinds = activeSparkleKinds()

  if (burstCount > 1 && index === 0 && activeKinds.cluster === 0) {
    return 'cluster'
  }

  if (burstCount > 1 && index === 1 && !hasClusterPick) {
    return 'cluster'
  }

  if (burstCount > 1 && index > 0 && !hasSoloPick && hasClusterPick) {
    return 'solo'
  }

  if (activeKinds.cluster < activeKinds.solo) {
    return 'cluster'
  }

  if (activeKinds.solo < activeKinds.cluster) {
    return 'solo'
  }

  return index % 2 === 0 ? 'cluster' : 'solo'
}

function queueSparkleBurst(count) {
  const picked = new Set()
  const pickedKinds = new Set()

  for (let index = 0; index < count; index++) {
    const preferKind = preferredSparkleKindForBurst(index, count, pickedKinds)
    const key = pickSparkleTarget(picked, preferKind) || pickSparkleTarget(picked)

    if (!key) {
      break
    }

    picked.add(key)

    const entry = sparkleRegistry.find((candidate) => candidate.key === key)

    if (entry) {
      pickedKinds.add(entry.kind)
    }

    const stagger = index * (20 + (starHash(`${key}-stagger`) % 35))

    const staggerTimer = window.setTimeout(() => {
      triggerSparkle(key)

      const timerIndex = sparkleStaggerTimers.indexOf(staggerTimer)

      if (timerIndex >= 0) {
        sparkleStaggerTimers.splice(timerIndex, 1)
      }
    }, stagger)

    sparkleStaggerTimers.push(staggerTimer)
  }
}

function triggerSparkle(key) {
  if (activeSparkles.value.has(key)) {
    return
  }

  const next = new Set(activeSparkles.value)
  next.add(key)
  activeSparkles.value = next

  const cooldown = 350 + (starHash(`${key}-cooldown-${Date.now()}`) % 650)
  sparkleCooldowns.set(key, Date.now() + SPARKLE_DURATION_MS + cooldown)

  window.setTimeout(() => {
    if (!activeSparkles.value.has(key)) {
      return
    }

    const updated = new Set(activeSparkles.value)
    updated.delete(key)
    activeSparkles.value = updated
  }, SPARKLE_DURATION_MS)
}

function runSparkleTick() {
  const now = Date.now()
  const activeCount = activeSparkles.value.size
  const openSlots = SPARKLE_MAX_ACTIVE - activeCount
  let burstCount = 0

  if (!openSlots) {
    sparkleTimer = window.setTimeout(runSparkleTick, SPARKLE_TICK_MS)
    return
  }

  if (activeCount < SPARKLE_MIN_ACTIVE) {
    burstCount = Math.min(openSlots, SPARKLE_MIN_ACTIVE - activeCount + 5)
  } else {
    burstCount = 2 + (starHash(`sparkle-add-${now}`) % 4)
  }

  if (burstCount >= 1 && starHash(`sparkle-multi-${now}`) % 100 < 92) {
    burstCount = Math.min(openSlots, burstCount + 2)
  }

  if (burstCount >= 3 && openSlots - burstCount > 0 && starHash(`sparkle-triple-${now}`) % 100 < 78) {
    burstCount = Math.min(openSlots, burstCount + 2)
  }

  if (burstCount >= 5 && openSlots - burstCount > 0 && starHash(`sparkle-quad-${now}`) % 100 < 55) {
    burstCount = Math.min(openSlots, burstCount + 2)
  }

  if (burstCount > 0) {
    queueSparkleBurst(burstCount)
  }

  sparkleTimer = window.setTimeout(runSparkleTick, SPARKLE_TICK_MS)
}

function startSparkleField() {
  buildSparkleRegistry()

  if (!sparkleRegistry.length) {
    return
  }

  queueSparkleBurst(8 + (starHash(`sparkle-boot-${Date.now()}`) % 6))
  runSparkleTick()
}

function stopSparkleField() {
  if (sparkleTimer !== null) {
    window.clearTimeout(sparkleTimer)
    sparkleTimer = null
  }

  for (const timer of sparkleStaggerTimers) {
    window.clearTimeout(timer)
  }

  sparkleStaggerTimers = []
}

function primeMotionCache() {
  motionConfigCache.clear()

  for (const cluster of props.field.clusters) {
    cluster.nodes.forEach((_, nodeIndex) => {
      getStarMotionConfig(cluster.id, nodeIndex)
    })
  }

  props.field.isolatedStars.forEach((_, starIndex) => {
    getStarMotionConfig('solo', starIndex)
  })
}

onMounted(async () => {
  primeMotionCache()
  await runClusterClamp()

  const hero =
    rootRef.value?.closest('.banner, .hero') ?? document.querySelector('.banner, .hero')

  if (hero && typeof ResizeObserver !== 'undefined') {
    clusterResizeObserver = new ResizeObserver(() => {
      runClusterClamp()
    })
    clusterResizeObserver.observe(hero)
  }

  startSparkleField()
  startParallax()
})

onUnmounted(() => {
  clusterResizeObserver?.disconnect()
  clusterResizeObserver = null
  stopSparkleField()
  stopParallax()
})
</script>

<style scoped>
.constellation-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
}

.constellation-bg__bg-star {
  opacity: var(--star-opacity, 0.7);
  transform-box: fill-box;
  transform-origin: center;
}

.constellation-bg__catalog-label {
  font-family: ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace;
  font-weight: 400;
  fill: var(--accent-yellow);
  opacity: 1;
  pointer-events: none;
  user-select: none;
}

.constellation-bg__bg-star--twinkle {
  animation: constellation-bg-twinkle var(--twinkle-duration, 4s) ease-in-out var(--twinkle-delay, 0s) infinite;
  will-change: opacity;
}

@keyframes constellation-bg-twinkle {
  0%,
  100% {
    opacity: var(--star-opacity);
  }

  38% {
    opacity: calc(var(--star-opacity) * 0.42);
  }

  52% {
    opacity: min(1, calc(var(--star-opacity) * 1.12));
  }

  68% {
    opacity: calc(var(--star-opacity) * 0.58);
  }
}

.constellation-bg__line {
  stroke: var(--accent-yellow);
  stroke-width: 0.08;
  stroke-linecap: round;
}

.constellation-bg__node {
  transform-box: fill-box;
  transform-origin: center;
}

.constellation-bg__node--solo {
  opacity: 0.62;
}

.constellation-bg__node--alive {
  animation: constellation-alive var(--alive-duration) ease-in-out var(--alive-delay) infinite backwards;
  will-change: transform;
}

@keyframes constellation-alive {
  0%,
  100% {
    transform: scale(var(--alive-scale-min));
  }

  24% {
    transform: scale(var(--alive-scale-mid));
  }

  50% {
    transform: scale(var(--alive-scale-max));
  }

  76% {
    transform: scale(var(--alive-scale-mid));
  }
}

.constellation-bg__sparkle-halo {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  pointer-events: none;
  animation: constellation-sparkle-halo var(--sparkle-duration, 3.2s) ease-in-out forwards;
  will-change: opacity, transform;
}

@keyframes constellation-sparkle-halo {
  0% {
    opacity: 0;
    transform: scale(0.78);
  }

  16% {
    opacity: 0.12;
    transform: scale(0.9);
  }

  38% {
    opacity: 0.52;
    transform: scale(1.16);
  }

  58% {
    opacity: 0.38;
    transform: scale(1.1);
  }

  78% {
    opacity: 0.14;
    transform: scale(0.96);
  }

  100% {
    opacity: 0;
    transform: scale(0.82);
  }
}

@media (prefers-reduced-motion: reduce) {
  .constellation-bg__bg-star--twinkle,
  .constellation-bg__node--alive,
  .constellation-bg__sparkle-halo {
    animation: none;
    will-change: auto;
  }
}
</style>
