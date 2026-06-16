<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, ready: isReady }">
    <div class="container">
      <a href="#top">
       <img src="../assets/LynxLogoLetras.png" alt="Logo Lynx" class="logo">
      </a>

      <!-- MENU DESKTOP -->
      <div class="nav-left">
        <a href="#servicos">Serviços</a>
        <a href="#processo">Processo</a>
        <a href="#contato">Contato</a>
      </div>

      <a href="https://wa.me/5522981069554?text=Olá, gostaria de mais informações." 
        target="_blank"  
      class="cta desktop-cta">Fale Conosco
      </a>

      <div class="hamburger" @click="toggleMenu">
        <span :class="{ open: isOpen }"></span>
      </div>

      <div :class="['menu-mobile', { open: isOpen }]">
        <a href="#">Serviços</a>
        <a href="#">Processo</a>
        <a href="#">Sobre</a>
        <a href="#">Contato</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleClickOutside = (e) => {
  const menu = document.querySelector('.menu-mobile')
  const button = document.querySelector('.hamburger')
  if (isOpen.value && menu && !menu.contains(e.target) && !button.contains(e.target)) {
    isOpen.value = false
  }
}

const isReady = ref(false)
onMounted(() => { 
  isScrolled.value = window.scrollY > 50

  requestAnimationFrame(() => {
    isReady.value = true
  })

  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>

.navbar {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
  max-width: 100%;
  box-sizing: border-box;
  padding-left: var(--section-pad-x);
  padding-right: var(--section-pad-x);
}

.container {
  width: 100%;
  max-width: var(--section-max-width);
  min-width: 0;
  margin: 0 auto;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  gap: 1rem;

  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
  border: 1px solid transparent;
}
.navbar.ready .container {
  transition:
    background 0.4s ease,
    backdrop-filter 0.4s ease,
    box-shadow 0.4s ease,
    border-color 0.4s ease;
}

.navbar.scrolled .container {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border-color: rgba(255, 255, 255, 0.3);
}

.logo {
  max-width: 15rem;
  max-height: 15rem;
  width: clamp(6rem, 28vw, 15rem);
}
.navbar.scrolled .logo { color: #333; }

.nav-left {
  display: flex;
  gap: 1.5rem;
  position: absolute;       
  left: 50%;
  transform: translateX(-50%); 
}

.nav-left a {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  transition: color 0.4s ease;
}
.navbar.scrolled .nav-left a { color: #1A1560; }

.nav-left a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0%;
  height: 2px;
  background: #CEE121;
  transition: width 0.25s ease;
}
.nav-left a:hover::after { width: 100%; }


.cta {
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;

  background: #3D40FF;
  color: #E5FF00 !important;
  border-color: transparent;

  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.cta:hover {
  transform: translateY(-2px);
}

/* ── Hamburger ── */
.hamburger {
  display: none;
  cursor: pointer;
  margin-left: 1rem;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 2px;
  background: white;
  position: relative;
  transition: all 0.3s ease;
}
.navbar.scrolled .hamburger span { background: black; }
.navbar.scrolled .hamburger span::before,
.navbar.scrolled .hamburger span::after { background: black; }

.hamburger span::before,
.hamburger span::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
}
.hamburger span::before { top: -8px; }
.hamburger span::after { top: 8px; }

.hamburger span.open { background: transparent; }
.hamburger span.open::before { transform: rotate(45deg); top: 0; }
.hamburger span.open::after { transform: rotate(-45deg); top: 0; }

/* ── Menu mobile ── */
.menu-mobile { display: none; }

/* ── MOBILE ── */
@media (max-width: 990px) {
  .container { padding: 0.6rem 1rem; }
  .nav-left { display: none; }
  .hamburger { margin-left: 0; display: block; }
  .cta {
    margin-left: auto;
    white-space: nowrap;
    font-size: 0.78rem;
    padding: 0.45rem 0.85rem;
  }

  .menu-mobile {
    position: absolute;
    top: 120%;
    right: 0;
    background: white;
    border-radius: 16px;
    padding: 1rem;
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all 0.25s ease;
  }
  .menu-mobile.open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
  .menu-mobile a { color: #555; text-decoration: none; }
}

@media (max-width: 480px) {
  .navbar { top: 0.75rem; }
  .container { padding: 0.5rem 0.75rem; gap: 0.5rem; }
  .logo { width: clamp(4.75rem, 24vw, 7rem); }
  .cta {
    font-size: 0.7rem;
    padding: 0.4rem 0.65rem;
  }
}
</style>