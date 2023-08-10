<template>
  <div class="background-container" :style="`background-image: url(${images.bG});`">
    <div class="modal fade show" style="display: block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header justify-content-center">
            <h5 class="modal-title text-shadow">Desconectado</h5>
          </div>
          <div class="modal-body text-center">
            <p>Você foi desconectado do servidor</p>
            <p>Por favor clique em 'OK' para entrar novamente</p>
            <button
              class="btn btn-secondary btn-lg text-shadow shadow-none px-5"
              @click="$router.push({ name: 'login-register' })"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
