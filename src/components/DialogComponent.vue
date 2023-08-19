<template>
  <div
    class="modal fade"
    :class="{ show: isShow }"
    :style="{ display: isShow ? 'block' : 'none' }"
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
import { ref, watchEffect } from 'vue';
import { useStore } from '@/store/dialogStore';

const store = useStore();

const isShow = ref(store.open);

const message = ref('');

const show = (text: string) => {
  message.value = text;
  isShow.value = true;
};

const hide = () => {
  message.value = '';
  isShow.value = false;
  store.hide();
};

watchEffect(() => {
  if (store.open) {
    show(store.message);
    return;
  }
});

defineExpose({
  show,
  hide
});
</script>

<style scoped></style>
