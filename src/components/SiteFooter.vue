<template>
  <footer
    class="footer"
    :style="{ '--footer-logo-align-overflow': `${footerLogoAlignOverflow}px` }"
  >
    <div class="footer-top">
      <span class="footer-copy">©2026 LYNX Studio. All Rights Reserved</span>
      <nav class="footer-nav">
        <RouterLink to="/politica-de-privacidade">Política de Privacidade</RouterLink>
      </nav>
    </div>
    <div
      ref="footerLogoWrapRef"
      class="footer-logo-wrap"
      :style="{
        '--footer-logo-scale': footerLogoScale,
        '--footer-logo-align-shift': `${footerLogoAlignShift}px`,
      }"
    >
      <div class="footer-logo-scale">
        <div class="footer-logo-visual">
          <img
            ref="footerLogoRef"
            :src="LynxLogo"
            alt="LYNX"
            class="footer-logo"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useFooterLogoScale } from '../composables/useFooterLogoScale.js'
import LynxLogo from '../assets/LynxLogoLetras.png'

const {
  wrapRef: footerLogoWrapRef,
  logoRef: footerLogoRef,
  scale: footerLogoScale,
  alignShift: footerLogoAlignShift,
  alignOverflow: footerLogoAlignOverflow,
} = useFooterLogoScale()
</script>

<style scoped>
.footer {
  background: #0A0A14;
  border-top: 1px solid rgba(56, 15, 233, 0.18);
  padding: var(--section-pad-y) var(--section-pad-x) 0;
  padding-right: calc(var(--scroll-sparkle-axis) + var(--footer-logo-align-overflow, 0px));
}

.footer-top {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
  padding-bottom: 48px;
  max-width: var(--section-max-width);
  margin-inline: auto;
  width: 100%;
}

.footer-copy {
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.4);
  letter-spacing: 0.04em;
}

.footer-nav {
  display: flex;
  gap: 40px;
}

.footer-nav a {
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.4);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.2s ease;
}

.footer-nav a:hover {
  color: #F0FF1F;
}

.footer-logo-wrap {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  max-width: var(--section-max-width);
  margin-top: 24px;
  margin-inline: auto;
}

.footer-logo-scale {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  height: calc(var(--footer-logo-height) * var(--footer-logo-scale, 1));
}

.footer-logo-visual {
  transform: scale(var(--footer-logo-scale, 1));
  transform-origin: bottom right;
  line-height: 0;
  flex-shrink: 0;
}

.footer-logo {
  width: auto;
  height: var(--footer-logo-height);
  max-width: none;
  max-height: none;
  flex-shrink: 0;
  object-fit: contain;
  object-position: bottom right;
  display: block;
  margin-right: calc(-1 * var(--footer-logo-align-shift, 0px));
  -webkit-user-drag: none;
  user-select: none;
}

@media (max-width: 1399px) {
  .footer {
    padding-right: var(--section-pad-x);
  }

  .footer-logo-wrap {
    width: 100%;
    margin-right: 0;
  }

  .footer-logo {
    margin-right: 0;
  }
}

@media (max-width: 920px) {
  .footer-top {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .footer {
    padding-top: 24px;
  }
}
</style>
