import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getHeroSkyLayout } from '../config/heroSkyLayout.js'

export function useHeroSkyLayout() {
  const viewportWidth = ref(
    typeof window !== 'undefined' ? window.innerWidth : 1280,
  )

  function syncWidth() {
    viewportWidth.value = window.innerWidth
  }

  onMounted(() => {
    syncWidth()
    window.addEventListener('resize', syncWidth, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', syncWidth)
  })

  const layout = computed(() => getHeroSkyLayout(viewportWidth.value))

  return { layout, viewportWidth }
}
