<template>
  <div class="loading-overlay" :class="{ 'd-none': !loading }">
    <div class="loading-content">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: progressBarWidth + '%' }"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        <div class="loading-text">Conectando...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
});
const progressBarWidth = ref(0);
const loading = ref(false);

let animationInterval: number | undefined = undefined;

function animateProgressBar(targetWidth: number, duration: number) {
  clearInterval(animationInterval);
  let startWidth = progressBarWidth.value;
  const increment = (targetWidth - startWidth) / (duration / 50);
  animationInterval = setInterval(() => {
    startWidth += increment;
    progressBarWidth.value = startWidth;
    if (startWidth >= targetWidth) {
      clearInterval(animationInterval);
    }
  }, 50);
}

watch(
  () => props.isLoading,
  (newValue) => {
    if (newValue) {
      loading.value = true;
      progressBarWidth.value = 0;
      animateProgressBar(100, 10000);
      return;
    }
    animateProgressBar(100, 0);
    progressBarWidth.value = 100;
    setTimeout(() => (loading.value = false), 500);
  }
);
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  position: absolute;
  bottom: 5%;
  text-align: center;
  padding: 20px;
  width: 100%;
}

.progress {
  margin-bottom: 10px;
  background-color: #353437;
  border: 2px solid #03030a;
  height: 25px;
  color: white;
}

.progress-bar {
  transition: width 0.5s ease;
  background: linear-gradient(to bottom, #527c8c, #335874, #1c2f48);
}

.loading-text {
  color: white;
  font-size: 16px;
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
