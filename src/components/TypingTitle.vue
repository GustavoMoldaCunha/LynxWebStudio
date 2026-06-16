<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  tag: { type: String, default: 'h2' },
  lines: { type: Array, required: true },
  speed: { type: Number, default: 80 },
  threshold: { type: Number, default: 0.2 }
})

const rootEl = ref(null)
const charIndex = ref(0)
const started = ref(false)
let intervalId = null
let observer = null

const totalLength = computed(() =>
  props.lines.reduce(
    (sum, line) => sum + line.reduce((ls, part) => ls + part.text.length, 0),
    0
  )
)

function lineOffset(lineIndex) {
  let offset = 0
  for (let li = 0; li < lineIndex; li++) {
    for (const part of props.lines[li]) offset += part.text.length
  }
  return offset
}

function visibleParts(lineIndex) {
  const offset = lineOffset(lineIndex)
  let remaining = charIndex.value - offset
  if (remaining <= 0) return []
  const result = []
  for (const part of props.lines[lineIndex]) {
    if (remaining <= 0) break
    if (remaining >= part.text.length) {
      result.push(part)
      remaining -= part.text.length
    } else {
      result.push({ ...part, text: part.text.slice(0, remaining) })
      remaining = 0
    }
  }
  return result
}

function startTyping() {
  let i = 0
  intervalId = setInterval(() => {
    i++
    charIndex.value = i
    if (i >= totalLength.value) {
      clearInterval(intervalId)
      intervalId = null
    }
  }, props.speed)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.value) {
          started.value = true
          observer.disconnect()
          startTyping()
        }
      })
    },
    { threshold: props.threshold }
  )
  if (rootEl.value) observer.observe(rootEl.value)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
  if (observer) observer.disconnect()
})
</script>

<template>
  <component :is="tag" ref="rootEl" v-bind="$attrs">
    <span
      v-for="(line, lineIndex) in lines"
      :key="lineIndex"
      class="typing-line"
    >
      <span class="typing-reserve" aria-hidden="true">
        <template v-for="(part, partIndex) in line" :key="'r-' + partIndex">
          <span v-if="part.accentClass" class="title-accent">{{ part.text }}</span>
          <template v-else>{{ part.text }}</template>
        </template>
      </span>
      <span class="typing-visible">
        <template v-for="(part, partIndex) in visibleParts(lineIndex)" :key="'v-' + partIndex">
          <span v-if="part.accentClass" class="title-accent">{{ part.text }}</span>
          <template v-else>{{ part.text }}</template>
        </template>
      </span>
    </span>
  </component>
</template>

<style scoped>
.typing-line {
  position: relative;
  display: block;
}

.typing-reserve {
  visibility: hidden;
  display: block;
}

.typing-visible {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
