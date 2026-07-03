import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './App.vue'
import PrivacyPolicy from './components/Privacypolicy.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/politica-de-privacidade', name: 'privacy', component: PrivacyPolicy },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
