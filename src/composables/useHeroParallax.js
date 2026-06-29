import { computed, onMounted, onUnmounted, reactive, ref, unref } from 'vue'

/** Signed parallax depth — negative values move opposite to the pointer. */
const LAYER_FACTORS = {
  starsBack: 0.16,
  starsMid: 0.44,
  terrain: 0.3,
  constellation: 1.22,
  copy: -0.085,
}

const LERP = 0.11
const SETTLE_EPSILON = 0.0008

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function hasFinePointer() {
  return window.matchMedia('(pointer: fine) and (hover: hover)').matches
}

export function useHeroParallax(containerRef) {
  const enabled = ref(false)
  const pointerInside = ref(false)

  const target = reactive({ x: 0, y: 0 })
  const current = reactive({ x: 0, y: 0 })
  const baseMax = ref(48)

  const offsets = reactive(
    Object.fromEntries(
      Object.keys(LAYER_FACTORS).map((key) => [key, { x: 0, y: 0 }]),
    ),
  )

  let rafId = 0
  let finePointerQuery = null
  let reducedMotionQuery = null

  function syncEnabled() {
    enabled.value = hasFinePointer() && !prefersReducedMotion()
    if (!enabled.value) {
      target.x = 0
      target.y = 0
    }
  }

  function syncBaseMax() {
    const el = unref(containerRef)
    if (!el) return

    const rect = el.getBoundingClientRect()
    const minSide = Math.min(rect.width, rect.height)
    baseMax.value = Math.min(72, Math.max(28, minSide * 0.058))
  }

  function updateOffsets() {
    for (const [key, factor] of Object.entries(LAYER_FACTORS)) {
      offsets[key].x = current.x * baseMax.value * factor
      offsets[key].y = current.y * baseMax.value * factor
    }
  }

  function tick() {
    const dx = target.x - current.x
    const dy = target.y - current.y

    current.x += dx * LERP
    current.y += dy * LERP

    if (
      Math.abs(dx) < SETTLE_EPSILON &&
      Math.abs(dy) < SETTLE_EPSILON &&
      target.x === 0 &&
      target.y === 0
    ) {
      current.x = 0
      current.y = 0
      updateOffsets()
      rafId = 0
      return
    }

    updateOffsets()
    rafId = requestAnimationFrame(tick)
  }

  function ensureTicking() {
    if (!rafId) {
      rafId = requestAnimationFrame(tick)
    }
  }

  function setTargetFromEvent(event) {
    const el = unref(containerRef)
    if (!el || !enabled.value) return

    const rect = el.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    ensureTicking()
  }

  function onPointerMove(event) {
    if (!enabled.value) return
    setTargetFromEvent(event)
  }

  function onPointerEnter(event) {
    if (!enabled.value) return
    pointerInside.value = true
    setTargetFromEvent(event)
  }

  function onPointerLeave() {
    pointerInside.value = false
    target.x = 0
    target.y = 0
    ensureTicking()
  }

  function onResize() {
    syncBaseMax()
  }

  function layerStyle(key) {
    const offset = offsets[key]
    const moving =
      pointerInside.value ||
      Math.abs(current.x) > SETTLE_EPSILON ||
      Math.abs(current.y) > SETTLE_EPSILON

    return {
      transform: `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`,
      willChange: enabled.value && moving ? 'transform' : undefined,
    }
  }

  const layers = computed(() => ({
    starsBack: layerStyle('starsBack'),
    starsMid: layerStyle('starsMid'),
    terrain: layerStyle('terrain'),
    constellation: layerStyle('constellation'),
    copy: {
      '--hero-parallax-x': `${offsets.copy.x.toFixed(2)}px`,
      '--hero-parallax-y': `${offsets.copy.y.toFixed(2)}px`,
      willChange:
        enabled.value &&
        (pointerInside.value ||
          Math.abs(current.x) > SETTLE_EPSILON ||
          Math.abs(current.y) > SETTLE_EPSILON)
          ? 'transform'
          : undefined,
    },
  }))

  onMounted(() => {
    syncEnabled()
    syncBaseMax()

    finePointerQuery = window.matchMedia('(pointer: fine) and (hover: hover)')
    reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    finePointerQuery.addEventListener('change', syncEnabled)
    reducedMotionQuery.addEventListener('change', syncEnabled)
    window.addEventListener('resize', onResize, { passive: true })

    const el = unref(containerRef)
    if (el) {
      el.addEventListener('pointermove', onPointerMove, { passive: true })
      el.addEventListener('pointerenter', onPointerEnter, { passive: true })
      el.addEventListener('pointerleave', onPointerLeave, { passive: true })
    }
  })

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)

    finePointerQuery?.removeEventListener('change', syncEnabled)
    reducedMotionQuery?.removeEventListener('change', syncEnabled)
    window.removeEventListener('resize', onResize)

    const el = unref(containerRef)
    if (el) {
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerenter', onPointerEnter)
      el.removeEventListener('pointerleave', onPointerLeave)
    }
  })

  return {
    enabled,
    offsets,
    layers,
  }
}
