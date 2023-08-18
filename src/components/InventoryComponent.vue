<template>
  <div v-if="characterSelected">
    <div
      class="modal"
      :class="{ show: open }"
      :style="{ display: open ? 'block' : 'none' }"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header justify-content-center position-relative">
            <h5 class="modal-title">Inventário</h5>
            <button
              type="button"
              class="btn-close shadow-none position-absolute delete"
              aria-label="Close"
              @click="toggleModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-between">
              <div>1</div>
              <div>2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUserCharacter } from '@/utils/localStorageUtils';
import { onMounted, onUnmounted, ref } from 'vue';

const open = ref(false);
const characterSelected = ref(getUserCharacter());

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
  if (event.key === 'i') {
    toggleModal();
  }
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

defineExpose({
  show,
  hide
});
</script>

<style scoped>
.modal-dialog {
  margin: 0;
  top: auto;
  left: auto;
  transform: none !important;
}
</style>
