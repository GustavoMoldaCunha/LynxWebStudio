<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="DECO_SPARKLE_PATH" fill="currentColor" />
  </svg>
</template>

<script setup>
import { DECO_SPARKLE_PATH } from '../config/decoSparkle.js'
</script>

<style scoped>
svg {
  filter:
    drop-shadow(0 0 8px rgba(79, 70, 229, 0.56))
    drop-shadow(0 0 16px rgba(79, 70, 229, 0.24));
}
</style>
