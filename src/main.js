import { createApp, nextTick } from 'vue'
import './style.css'
import Root from './Root.vue'
import router from './router.js'
import { initLenis, scrollToHashWhenReady } from './composables/useLenis.js'

router.afterEach((to) => {
  if (!to.hash) return

  nextTick(() => {
    requestAnimationFrame(() => {
      scrollToHashWhenReady(to.hash)
    })
  })
})

const app = createApp(Root)
app.use(router)
initLenis()
app.mount('#app')
