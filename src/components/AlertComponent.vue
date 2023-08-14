<template>
  <div
    class="modal fade"
    :class="{ show: isModalOpen }"
    :style="{ display: isModalOpen ? 'block' : 'none' }"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5 class="modal-title text-shadow">Atenção!</h5>
        </div>
        <div class="modal-body text-center">
          <p>{{ isMessage }}</p>
          <button
            class="btn btn-secondary btn-lg text-shadow shadow-none px-5"
            @click="toggleModal"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const isModalOpen = ref(false);
const isMessage = ref('');

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

function toggleModal() {
  isModalOpen.value = !isModalOpen.value;
}

watch(
  () => props.isShow,
  () => {
    isModalOpen.value = true;
  }
);

watch(
  () => props.message,
  (newMessage) => {
    isMessage.value = newMessage;
  }
);
</script>

<style scoped></style>
