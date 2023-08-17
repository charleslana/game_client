<template>
  <div
    class="modal fade"
    :class="{ show: open }"
    :style="{ display: open ? 'block' : 'none' }"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5 class="modal-title text-shadow">Atenção!</h5>
        </div>
        <div class="modal-body text-center">
          <p>{{ message }}</p>
          <button class="btn btn-secondary btn-lg text-shadow shadow-none px-5" @click="hide">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
const message = ref('');

const show = (text: string) => {
  message.value = text;
  open.value = true;
};

const hide = () => {
  open.value = false;
};

defineExpose({
  show,
  hide
});
</script>

<style scoped></style>
