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
import { ref, onUnmounted } from 'vue';

const loading = ref(false);
const progressBarWidth = ref(0);

let interval: number | undefined = undefined;

const showLoading = () => {
  loading.value = true;
  animateProgressBar(10);
};

const hideLoading = () => {
  progressBarWidth.value = 100;
  setTimeout(() => {
    loading.value = false;
    progressBarWidth.value = 0;
  }, 500);
};

const animateProgressBar = (seconds: number) => {
  progressBarWidth.value = 0;
  const increment = 100 / (seconds * 10);
  interval = setInterval(() => {
    progressBarWidth.value += increment;
    if (progressBarWidth.value >= 100) {
      clearInterval(interval);
    }
  }, 100);
};

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});

defineExpose({
  showLoading,
  hideLoading
});
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
  height: 25px;
  color: white;
}

.progress-bar {
  transition: width 0.5s ease;
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
