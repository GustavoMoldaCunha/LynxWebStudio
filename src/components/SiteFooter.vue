<template>
  <footer
    class="footer"
    :style="{ '--footer-logo-align-overflow': `${footerLogoAlignOverflow}px` }"
  >
    <div class="footer-inner">
      <div class="footer-top">
        <nav class="footer-nav" aria-label="Rodapé">
          <a href="#servicos" @click.prevent="goToSection('servicos')">Serviços</a>
          <a href="#processo" @click.prevent="goToSection('processo')">Processo</a>
          <a href="#contato" @click.prevent="goToSection('contato')">Contato</a>
          <RouterLink to="/politica-de-privacidade">Política de Privacidade</RouterLink>
        </nav>
        <span class="footer-copy">© 2026</span>
      </div>
      <div
        ref="footerLogoWrapRef"
        class="footer-logo-wrap"
        :style="{
          '--footer-logo-align-shift': `${footerLogoAlignShift}px`,
        }"
      >
        <img
          ref="footerLogoRef"
          :src="LynxLogo"
          alt="LYNX"
          class="footer-logo"
          draggable="false"
        />
      </div>
    </div>
  </footer>
</template>

<script setup>
import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFooterLogoScale } from '../composables/useFooterLogoScale.js'
import { scrollToHashWhenReady } from '../composables/useLenis.js'
import LynxLogo from '../assets/LynxLogoLetras.png'

const route = useRoute()
const router = useRouter()

const {
  wrapRef: footerLogoWrapRef,
  logoRef: footerLogoRef,
  alignShift: footerLogoAlignShift,
  alignOverflow: footerLogoAlignOverflow,
} = useFooterLogoScale()

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
.footer {
  background: #0A0A14;
  border-top: 1px solid rgba(56, 15, 233, 0.18);
  padding: var(--section-pad-y) var(--section-pad-x) 0;
  padding-right: calc(var(--scroll-sparkle-axis) + var(--footer-logo-align-overflow, 0px));
}

.footer-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.footer-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px 48px;
  width: 100%;
  max-width: var(--section-max-width);
  margin-inline: auto;
  padding-bottom: 96px;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 16px 48px;
  min-width: 0;
}

.footer-nav a {
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(232, 230, 255, 0.48);
  text-decoration: none;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.footer-nav a:hover {
  color: #F0FF1F;
}

.footer-copy {
  flex-shrink: 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(232, 230, 255, 0.48);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
}

.footer-logo-wrap {
  width: 100%;
  line-height: 0;
  overflow: visible;
}

.footer-logo {
  display: block;
  width: calc(100% + var(--footer-logo-align-shift, 0px));
  height: auto;
  max-width: none;
  -webkit-user-drag: none;
  user-select: none;
  filter:
    drop-shadow(0 0 18px rgba(55, 14, 231, 0.28))
    drop-shadow(0 0 42px rgba(55, 14, 231, 0.14));
}

@media (max-width: 1399px) {
  .footer {
    padding-right: var(--section-pad-x);
  }
}

@media (max-width: 720px) {
  .footer-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding-bottom: 56px;
  }

  .footer-nav {
    gap: 12px 28px;
  }

  .footer-nav a,
  .footer-copy {
    font-size: 0.85rem;
  }

  .footer-copy {
    order: -1;
  }
}

@media (max-width: 480px) {
  .footer {
    padding-top: 24px;
  }
}
</style>
