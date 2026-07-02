<template>
  <Teleport to="body">
  <nav class="navbar">
    <div class="navbar-glass" aria-hidden="true"></div>
    <div class="container">
      <a href="#top">
       <img src="../assets/LynxLogoLetras.png" alt="Logo Lynx" class="logo" draggable="false">
      </a>

      <!-- MENU DESKTOP -->
      <div class="nav-left">
        <a href="#servicos">serviços</a>
        <a href="#processo">processo</a>
        <a href="#contato">contato</a>
      </div>

      <div class="nav-right">
        <a href="https://wa.me/5522981069554?text=Olá, gostaria de mais informações." 
          target="_blank"  
          class="cta desktop-cta">Fale Conosco
        </a>

        <button
          type="button"
          class="hamburger"
          :aria-label="isOpen ? 'Fechar menu' : 'Abrir menu'"
          :aria-expanded="isOpen"
          @click="toggleMenu"
        >
          <span :class="{ open: isOpen }"></span>
        </button>
      </div>
    </div>

    <div :class="['menu-mobile', { open: isOpen }]">
      <a href="#">serviços</a>
      <a href="#">processo</a>
      <a href="#">sobre</a>
      <a href="#">contato</a>
    </div>
  </nav>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (e) => {
  const menu = document.querySelector('.menu-mobile')
  const button = document.querySelector('.hamburger')
  if (isOpen.value && menu && !menu.contains(e.target) && !button.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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
.hamburger {
  display: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  border: none;
  background: transparent;
  min-width: 48px;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  margin: -0.25rem -0.375rem -0.25rem 0;
  border-radius: 10px;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.hamburger:focus-visible {
  outline: 2px solid rgba(240, 255, 31, 0.55);
  outline-offset: 2px;
}

.hamburger span {
  display: block;
  width: 26px;
  height: 2px;
  background: rgba(232, 230, 255, 0.92);
  position: relative;
  transition: all 0.3s ease;
  pointer-events: none;
}

.hamburger span::before,
.hamburger span::after {
  content: '';
  position: absolute;
  left: 0;
  width: 26px;
  height: 2px;
  background: rgba(232, 230, 255, 0.92);
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
  .navbar { padding: 0 1.5rem 8px; min-height: 4.5rem; }
  .nav-left { display: none; }
  .nav-right { gap: 1rem; }
  .hamburger { display: flex; }
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

  .menu-mobile {
    position: absolute;
    top: 100%;
    right: 1.5rem;
    margin-top: 0.5rem;
    z-index: 2;
    background: #E8E6FF;
    border-radius: 16px;
    padding: 0.625rem;
    width: min(240px, calc(100vw - 2.5rem));
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(8px);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .menu-mobile.open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
  .menu-mobile a {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 0.625rem 0.875rem;
    border-radius: 10px;
    color: #555;
    text-decoration: none;
    text-transform: none;
    transition: color 0.35s ease, background 0.2s ease;
  }
  .menu-mobile a:hover,
  .menu-mobile a:active {
    color: #380FE9;
    background: rgba(56, 15, 233, 0.08);
  }
}

@media (max-width: 480px) {
  .navbar { padding: 0 1.25rem 8px; min-height: 4rem; }
  .container { gap: 0.625rem; }
  .nav-right { gap: 0.625rem; }
  .menu-mobile { right: 1.25rem; }
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
