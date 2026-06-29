<script setup>
import { computed } from 'vue'
import { useScrollRevealOnce } from '../composables/useScrollRevealOnce.js'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  tag: { type: String, default: 'div' },
  threshold: { type: Number, default: 0.2 },
  direction: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value),
  },
  delay: { type: Number, default: 0 },
})

const { root, revealed } = useScrollRevealOnce({
  threshold: props.threshold,
})

const revealStyle = computed(() =>
  props.delay ? { '--scroll-reveal-delay': `${props.delay}ms` } : undefined,
)
</script>

<template>
  <component
    :is="tag"
    ref="root"
    v-bind="$attrs"
    class="scroll-reveal"
    :class="{
      'scroll-reveal--played': revealed,
      'scroll-reveal--from-left': direction === 'left',
      'scroll-reveal--from-right': direction === 'right',
    }"
    :style="revealStyle"
  >
    <slot />
  </component>
</template>
