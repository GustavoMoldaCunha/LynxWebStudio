<template>
  <div class="carousel">
    <div class="track" :style="{ transform: `translateY(-${offset}px)` }">
      <div class="slide" v-for="(img, i) in images" :key="i">
        <img :src="img" :alt="`slide ${i}`" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const baseImages = [
  'https://placehold.co/400x300/3308F5/white?text=Projeto+1',
  'https://placehold.co/400x300/1a0080/white?text=Projeto+2',
  'https://placehold.co/400x300/6600cc/white?text=Projeto+3',
  'https://placehold.co/400x300/3308F5/white?text=Projeto+4',
]
const images = [...baseImages, ...baseImages]

const offset = ref(0)
const slideHeight = 320 // altura do slide + gap
let interval

onMounted(() => {
  interval = setInterval(() => {
    offset.value += 0.5

    if (offset.value >= slideHeight * baseImages.length) {
      offset.value = 0
    }
  }, 16)
})

onUnmounted(() => clearInterval(interval))
</script>

<style scoped>
.carousel {
  width: 400px;
  height: 585px;
  overflow: hidden;
}

.track {
  display: flex;
  flex-direction: column;
  gap: 30px;
  transition: none;
}

.slide img {
  width: 100%;
  height: 285px;
  object-fit: cover;
  border-radius: 20px;
}

body {
  margin: 0;
}

</style>