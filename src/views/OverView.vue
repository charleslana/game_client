<template>
  <div
    class="background-container"
    :style="`background-image: url(${images.mapTundraInfame});`"
  ></div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
</script>

<style scoped>
.background-container {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
}
</style>
