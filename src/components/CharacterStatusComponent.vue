<template>
  <div>
    <div v-if="isModalVisible" class="modal" tabindex="-1" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header justify-content-center position-relative">
            <h5 class="modal-title">Personagem</h5>
            <button
              type="button"
              class="btn-close shadow-none position-absolute delete"
              aria-label="Close"
              @click="toggleModal"
            ></button>
          </div>
          <div class="modal-body">
            <h6>Básico</h6>
            <div class="d-flex justify-content-between">
              <div>
                <ul class="list-unstyled">
                  <li>
                    <ul>
                      <li>{{ getCharacterName(characterSelected.character.id) }} 19 grau</li>
                      <li>em Capella</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  :src="getCharacterClassIcon(characterSelected.character.id)"
                  alt="Icon"
                  height="30"
                />
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <div>Grau de Honra</div>
              <div>Classe 1 (0%)</div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Pontos de Honra</div>
              <div>0</div>
            </div>
            <hr />
            <h6>Status</h6>
            <div class="d-flex justify-content-between mb-2">
              <div class="d-flex justify-content-between">
                <div class="me-2">FOR</div>
                <div>1</div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="me-2">INT</div>
                <div>1</div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="me-2">DES</div>
                <div>1</div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex flex-column">
                <div class="mb-3">FOR</div>
                <div class="mb-3">INT</div>
                <div class="mb-3">DES</div>
              </div>
              <div class="d-flex flex-column">
                <div class="mb-3">1</div>
                <div class="mb-3">1</div>
                <div class="mb-3">1</div>
              </div>
              <div class="d-flex flex-column">
                <input type="number" class="form-control mb-2 shadow-none" placeholder="0" />
                <input type="number" class="form-control mb-2 shadow-none" placeholder="0" />
                <input type="number" class="form-control mb-2 shadow-none" placeholder="0" />
              </div>
              <div class="d-flex flex-column">
                <button type="button" class="btn btn-dark mb-2">+</button>
                <button type="button" class="btn btn-dark mb-2">+</button>
                <button type="button" class="btn btn-dark mb-2">+</button>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Pontos</div>
              <div>0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type IUserCharacter from '@/interface/IUserCharacter';
import { getCharacterName, getCharacterClassIcon } from '@/utils/utils';

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true
  },
  characterSelected: {
    type: Object as () => IUserCharacter,
    required: true
  }
});

const isModalVisible = ref(false);

function toggleModal() {
  isModalVisible.value = !isModalVisible.value;
}

watch(
  () => props.isShow,
  () => {
    toggleModal();
  }
);

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'c') {
    toggleModal();
  }
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
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
