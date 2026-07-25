<script setup>
import { computed } from 'vue'
import { useScrollRevealOnce } from '../composables/useScrollRevealOnce.js'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  tag: { type: String, default: 'h2' },
  lines: { type: Array, required: true },
  threshold: { type: Number, default: 0.2 },
  direction: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value),
  },
  delay: { type: Number, default: 0 },
})

const { root: revealRootEl, revealed } = useScrollRevealOnce({
  threshold: props.threshold,
})

const revealStyle = computed(() =>
  props.delay ? { '--scroll-reveal-delay': `${props.delay}ms` } : undefined,
)

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return String(text).replace(/[&<>"']/g, (m) => map[m])
}

function formatTextForNoOrphans(text) {
  const escaped = escapeHtml(text)
  return escaped.replace(/\s+([^\s]+)$/, '&nbsp;$1')
}
</script>

<template>
  <component
    :is="tag"
    ref="revealRootEl"
    v-bind="$attrs"
    class="scroll-reveal"
    :class="{
      'scroll-reveal--played': revealed,
      'scroll-reveal--from-left': direction === 'left',
      'scroll-reveal--from-right': direction === 'right',
    }"
    :style="revealStyle"
  >
    <span v-for="(line, lineIndex) in lines" :key="lineIndex" class="title-line">
      <template v-for="(part, partIndex) in line" :key="partIndex">
        <span v-if="part.accentClass" :class="part.accentClass" v-html="formatTextForNoOrphans(part.text)"></span>
        <span v-else v-html="formatTextForNoOrphans(part.text)"></span>
      </template>
    </span>
  </component>
</template>

<style scoped>
.title-line {
  display: block;
}
</style>
