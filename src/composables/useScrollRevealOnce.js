import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export function useScrollRevealOnce(options = {}) {
  const root = ref(null)
  const revealed = ref(false)
  let observer = null

  function reveal() {
    if (revealed.value) return
    revealed.value = true
    observer?.disconnect()
  }

  onMounted(async () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealed.value = true
      return
    }

    await nextTick()

    const target =
      typeof options.observeTarget === 'string'
        ? document.querySelector(options.observeTarget)
        : options.observeTarget ?? root.value

    if (!target) return

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal()
      },
      { threshold: options.threshold ?? 0.2 },
    )

    observer.observe(target)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { root, revealed }
}
