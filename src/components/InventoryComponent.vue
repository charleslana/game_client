<template>
  <div v-if="characterItems">
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
            <div class="row">
              <div class="col-sm-6">
                <div class="w-100 text-center mb-2">Equipamentos</div>
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="square"></div>
                  <div class="square"></div>
                  <div class="square"></div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="square"></div>
                  <div class="square"></div>
                  <div class="square"></div>
                </div>
                <div class="d-flex justify-content-center align-items-center mb-4">
                  <div class="square"></div>
                </div>
              </div>
              <div class="col-sm-6 row row-cols-auto">
                <div class="w-100 text-center mb-2">
                  Quantidade {{ characterItems.length }} / {{ slotAvailable }}
                </div>
                <div
                  class="col p-0"
                  v-for="characterItem in characterItems"
                  :key="characterItem.id"
                >
                  <a
                    href="#"
                    v-tooltip
                    :title="generateTooltipItem(characterItem)"
                    data-bs-html="true"
                    data-bs-placement="auto"
                  >
                    <div
                      class="item-bg d-flex justify-content-center align-items-center"
                      :style="`background-image: url(${images.itemBg});`"
                    >
                      <img :src="getItemImage(characterItem.item.id)" alt="Item image" width="40" />
                    </div>
                  </a>
                </div>
                <div
                  class="col p-0"
                  v-for="index in slotAvailable - characterItems.length"
                  :key="index"
                >
                  <a href="#">
                    <div class="item-bg" :style="`background-image: url(${images.itemBg});`"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUserCharacterItems } from '@/utils/localStorageUtils';
import { onMounted, onUnmounted, ref } from 'vue';
import images from '@/data/imageData';
import { generateTooltipItem } from '@/utils/tooltipUtils';
import { getItemImage } from '@/utils/itemUtils';

const open = ref(false);
const slotAvailable = ref(50);
const characterItems = getUserCharacterItems();

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

.item-bg {
  width: 50px;
  height: 50px;
  background-size: contain;
}

img {
  height: 87%;
  object-fit: contain;
}

.square {
  width: 70px;
  height: 70px;
  border: 2px solid white;
}
</style>
