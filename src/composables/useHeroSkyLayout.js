import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getHeroSkyLayout } from '../config/heroSkyLayout.js'

function readNavbarHeight() {
  if (typeof document === 'undefined') return 88
  const navbar = document.querySelector('.navbar')
  return navbar ? navbar.getBoundingClientRect().height : 88
}

export function useHeroSkyLayout() {
  const viewportWidth = ref(
    typeof window !== 'undefined' ? window.innerWidth : 1280,
  )
  const viewportHeight = ref(
    typeof window !== 'undefined' ? window.innerHeight : 900,
  )
  const navbarHeight = ref(88)

  function syncViewport() {
    viewportWidth.value = window.innerWidth
    viewportHeight.value = window.innerHeight
    navbarHeight.value = readNavbarHeight()
  }

  onMounted(() => {
    syncViewport()
    window.addEventListener('resize', syncViewport, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', syncViewport)
  })

  const layout = computed(() =>
    getHeroSkyLayout(viewportWidth.value, viewportHeight.value, navbarHeight.value),
  )

  return { layout, viewportWidth }
}
