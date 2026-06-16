<template>
  <div
    ref="root"
    class="section-deco-draw"
    :class="[
      `section-deco-draw--${orientation}`,
      { 'section-deco-draw--reverse': reverse, 'section-deco-draw--played': played }
    ]"
    :style="travelStyle"
  >
    <template v-if="orientation === 'horizontal' || reverse">
      <div class="section-deco-draw__star">
        <slot name="star" />
      </div>
      <div ref="lineRef" class="section-deco-draw__line">
        <slot name="line" />
      </div>
    </template>
    <template v-else>
      <div ref="lineRef" class="section-deco-draw__line">
        <slot name="line" />
      </div>
      <div class="section-deco-draw__star">
        <slot name="star" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { useSectionDecoDraw } from '../composables/useSectionDecoDraw.js'

const props = defineProps({
  orientation: {
    type: String,
    default: 'vertical'
  },
  reverse: {
    type: Boolean,
    default: false
  },
  observeTarget: {
    type: String,
    default: null
  },
  threshold: {
    type: Number,
    default: 0.2
  }
})

const { root, lineRef, played, travelStyle } = useSectionDecoDraw({
  orientation: props.orientation,
  observeTarget: props.observeTarget,
  threshold: props.threshold
})
</script>
