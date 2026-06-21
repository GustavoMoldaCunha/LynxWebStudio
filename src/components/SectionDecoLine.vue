<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="deco-trail"
    :class="`deco-trail--${orientation}`"
    :viewBox="viewBox"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient
        :id="gradId"
        :x1="gradient.x1"
        :y1="gradient.y1"
        :x2="gradient.x2"
        :y2="gradient.y2"
      >
        <stop offset="0%" stop-color="#380FE9" />
        <stop offset="100%" stop-color="#380FE9" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path :d="path" :fill="`url(#${gradId})`" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { useId } from 'vue'

const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
  },
  reverse: {
    type: Boolean,
    default: false,
  },
})

const gradId = `section-deco-trail-${useId()}`

const HORIZONTAL_PATH =
  'M 0 3 C 0 0.75 0.55 0.3 1.6 0.3 C 34 0.45 70 2.88 99 2.96 L 100 3 L 99 3.04 C 70 3.12 34 5.55 1.6 5.7 C 0.55 5.7 0 5.2 0 3 Z'

const HORIZONTAL_PATH_REVERSE =
  'M 100 3 C 100 0.75 99.45 0.3 98.4 0.3 C 66 0.45 30 2.88 1 2.96 L 0 3 L 1 3.04 C 30 3.12 66 5.55 98.4 5.7 C 99.45 5.7 100 5.2 100 3 Z'

const VERTICAL_PATH =
  'M 3 100 C 0.75 100 0.3 99.45 0.3 98.4 C 0.45 66 2.88 30 2.96 1 L 3 0 L 3.04 1 C 3.12 30 5.55 66 5.7 98.4 C 5.7 99.45 5.2 100 3 100 Z'

const VERTICAL_PATH_REVERSE =
  'M 3 0 C 0.75 0 0.3 0.55 0.3 1.6 C 0.45 34 2.88 70 2.96 99 L 3 100 L 3.04 99 C 3.12 70 5.55 34 5.7 1.6 C 5.7 0.55 5.2 0 3 0 Z'

const viewBox = computed(() =>
  props.orientation === 'vertical' ? '0 0 6 100' : '0 0 100 6',
)

const path = computed(() => {
  if (props.orientation === 'vertical') {
    return props.reverse ? VERTICAL_PATH_REVERSE : VERTICAL_PATH
  }
  return props.reverse ? HORIZONTAL_PATH_REVERSE : HORIZONTAL_PATH
})

const gradient = computed(() => {
  if (props.orientation === 'vertical') {
    return props.reverse
      ? { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
      : { x1: '0%', y1: '100%', x2: '0%', y2: '0%' }
  }
  return props.reverse
    ? { x1: '100%', y1: '0%', x2: '0%', y2: '0%' }
    : { x1: '0%', y1: '0%', x2: '100%', y2: '0%' }
})
</script>

<style scoped>
.deco-trail {
  display: block;
}

.deco-trail--horizontal {
  width: 100%;
  height: var(--deco-trail-thickness, 6px);
}

.deco-trail--vertical {
  width: var(--deco-trail-thickness, 6px);
  height: 100%;
}
</style>
