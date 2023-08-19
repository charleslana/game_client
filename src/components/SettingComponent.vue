<template>
  <div
    class="modal"
    :class="{ show: open }"
    :style="{ display: open ? 'block' : 'none' }"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header justify-content-center position-relative">
          <h5 class="modal-title">Configurações</h5>
          <button
            type="button"
            class="btn-close shadow-none position-absolute delete"
            aria-label="Close"
            @click="toggleModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between">
            <button class="btn btn-dark text-shadow shadow-none" @click="logout">
              Sair da conta
            </button>
            <button class="btn btn-dark text-shadow shadow-none" @click="logoutCharacter">
              Trocar de personagem
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import UserCharacterService from '@/service/UserCharacterService';
import { removeUserCharacter } from '@/utils/localStorageUtils';
import { showError, logout } from '@/utils/utils';
import router from '@/router';
import { useStore as useLoadingStore } from '@/store/loadingStore';

const loadingStore = useLoadingStore();
const open = ref(false);

const show = () => {
  open.value = true;
};

const hide = () => {
  open.value = false;
};

function toggleModal() {
  open.value = !open.value;
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'g') {
    toggleModal();
  }
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

async function logoutCharacter(): Promise<void> {
  try {
    loadingStore.showLoading();
    await UserCharacterService.logout();
    removeUserCharacter();
    router.push({ name: 'select-character' });
    loadingStore.hideLoading();
  } catch (err: unknown) {
    showError(err);
  }
}

defineExpose({
  show,
  hide
});
</script>

<style scoped>
.modal-dialog {
  margin: 0 0 0 auto;
  top: auto;
  left: auto;
  transform: none !important;
}
</style>
