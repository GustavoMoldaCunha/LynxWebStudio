<template>
  <Teleport to="body">
  <nav class="navbar">
    <div class="navbar-glass" aria-hidden="true"></div>
    <div class="container">
      <RouterLink to="/">
       <img src="../assets/LynxLogoLetras.png" alt="Logo Lynx" class="logo" draggable="false">
      </RouterLink>

      <!-- MENU DESKTOP -->
      <div class="nav-left">
        <a href="#servicos" @click.stop.prevent="goToSection('servicos')">serviços</a>
        <a href="#processo" @click.stop.prevent="goToSection('processo')">processo</a>
        <a href="#contato" @click.stop.prevent="goToSection('contato')">contato</a>
      </div>

      <div class="nav-right">
        <a href="https://wa.me/5522981069554?text=Olá, gostaria de mais informações." 
          target="_blank"  
          class="cta desktop-cta">Fale Conosco
        </a>
      </div>
    </div>

  </nav>
  </Teleport>
</template>

<script setup>
import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { scrollToHashWhenReady } from '../composables/useLenis.js'

const route = useRoute()
const router = useRouter()

async function goToSection(sectionId) {
  const hash = `#${sectionId}`

  if (route.path !== '/') {
    await router.push({ path: '/', hash })
    return
  }

  window.history.replaceState(null, '', hash)
  await nextTick()
  requestAnimationFrame(() => {
    scrollToHashWhenReady(hash)
  })
}
</script>

<style scoped>

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  box-sizing: border-box;
  padding: 0 2rem 10px;
  min-height: 5rem;
  display: flex;
  align-items: flex-end;
  isolation: isolate;
  background: transparent;
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.22);
}

.navbar-glass {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: rgba(10, 10, 20, 0.38);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  backdrop-filter: blur(24px) saturate(180%);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.28);
  pointer-events: none;
}

@supports not (
  (-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))
) {
  .navbar-glass {
    background: rgba(10, 10, 20, 0.92);
  }
}

.container {
  width: 100%;
  min-width: 0;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  align-items: flex-end;
  gap: 1rem;
}

.logo {
  display: block;
  max-width: 13rem;
  max-height: 13rem;
  width: clamp(5.5rem, 24vw, 13rem);
  object-fit: contain;
  -webkit-user-drag: none;
  user-select: none;
}

.nav-left {
  display: flex;
  align-items: flex-end;
  gap: clamp(2rem, 1.5rem + 3vw, 5.5rem);
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}

.nav-left a {
  position: relative;
  text-decoration: none;
  color: rgba(232, 230, 255, 0.92);
  font-size: 1rem;
  text-transform: none;
  transition: color 0.35s ease, text-shadow 0.35s ease;
}

.nav-left a:hover {
  color: #fff;
  text-shadow:
    0 0 8px rgba(220, 218, 255, 0.45),
    0 0 18px rgba(120, 100, 255, 0.22);
}


.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
  flex-shrink: 0;
}

.cta {
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.95rem;

  background: #380FE9;
  color: #E8E6FF !important;
  border-color: transparent;

  transition: transform 0.2s ease;
}
.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(56, 15, 233, 0.35);
}

/* ── Hamburger ── */

/* ── Menu mobile ── */
/* ── MOBILE ── */
@media (max-width: 990px) {
  .navbar { padding: 0 1.5rem 8px; min-height: 4.5rem; }
  .nav-left { display: none; }
  .nav-right { gap: 1rem; }
  .cta {
    white-space: nowrap;
    font-size: 0.875rem;
    padding: 0.45rem 0.875rem;
  }

  .logo {
    width: auto;
    height: 2.05rem;
    max-width: min(42vw, 11rem);
    max-height: none;
  }
}

@media (max-width: 480px) {
  .navbar { padding: 0 1.25rem 8px; min-height: 4rem; }
  .container { gap: 0.625rem; }
  .nav-right { gap: 0.625rem; }
  .logo {
    height: 1.95rem;
    max-width: min(48vw, 10rem);
  }
  .cta {
    font-size: 0.8125rem;
    padding: 0.4rem 0.7rem;
  }
}
</style>
