import { ref, onMounted, onUnmounted } from 'vue'

export function useSectionDecoDraw(options = {}) {
  const root = ref(null)
  const lineRef = ref(null)
  const played = ref(false)
  const travelStyle = ref({})
  const orientation = options.orientation ?? 'vertical'

  let observer = null

  function measure() {
    if (!lineRef.value || !root.value) return
    const gapValue = getComputedStyle(root.value).gap
    const gap = gapValue ? parseFloat(gapValue) || 0 : 0
    const travel =
      orientation === 'horizontal'
        ? lineRef.value.offsetWidth + gap
        : lineRef.value.offsetHeight + gap
    travelStyle.value = { '--deco-travel': `${travel}px` }
  }

  function play() {
    if (played.value) return
    measure()
    played.value = true
    observer?.disconnect()
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      measure()
      played.value = true
      return
    }

    measure()

    const target =
      typeof options.observeTarget === 'string'
        ? document.querySelector(options.observeTarget)
        : options.observeTarget ?? root.value

    if (!target) return

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) play()
      },
      { threshold: options.threshold ?? 0.2 }
    )

    observer.observe(target)
    window.addEventListener('resize', measure)
  })

  onUnmounted(() => {
    observer?.disconnect()
    window.removeEventListener('resize', measure)
  })

  return { root, lineRef, played, travelStyle }
}
