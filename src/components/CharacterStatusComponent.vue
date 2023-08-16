<template>
  <div v-if="characterSelected">
    <div v-if="isModalVisible" class="modal" tabindex="-1" style="display: block">
      <div class="modal-dialog modal-dialog-scrollable">
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
              <div>{{ characterSelected.honor }}</div>
            </div>
            <hr />
            <h6>Status</h6>
            <div class="d-flex justify-content-between mb-2">
              <div class="d-flex justify-content-between">
                <div class="me-2">FOR</div>
                <div>{{ characterSelected.strength }}</div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="me-2">INT</div>
                <div>{{ characterSelected.intelligence }}</div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="me-2">DES</div>
                <div>{{ characterSelected.dexterity }}</div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex flex-column">
                <div class="mb-3">FOR</div>
                <div class="mb-3">INT</div>
                <div class="mb-3">DES</div>
              </div>
              <div class="d-flex flex-column">
                <div class="mb-3">{{ characterSelected.strength }}</div>
                <div class="mb-3">{{ characterSelected.intelligence }}</div>
                <div class="mb-3">{{ characterSelected.dexterity }}</div>
              </div>
              <div class="d-flex flex-column">
                <input
                  type="number"
                  class="form-control mb-2 shadow-none"
                  placeholder="0"
                  v-model="attributeStrength"
                />
                <input
                  type="number"
                  class="form-control mb-2 shadow-none"
                  placeholder="0"
                  v-model="attributeIntelligence"
                />
                <input
                  type="number"
                  class="form-control mb-2 shadow-none"
                  placeholder="0"
                  v-model="attributeDexterity"
                />
              </div>
              <div class="d-flex flex-column">
                <button
                  type="button"
                  class="btn btn-dark mb-2"
                  :disabled="isDisabled || isStrengthButtonDisabled"
                  @click="updateAttribute"
                >
                  +
                </button>
                <button
                  type="button"
                  class="btn btn-dark mb-2"
                  :disabled="isDisabled || isIntelligenceButtonDisabled"
                  @click="updateAttribute"
                >
                  +
                </button>
                <button
                  type="button"
                  class="btn btn-dark mb-2"
                  :disabled="isDisabled || isDexterityButtonDisabled"
                  @click="updateAttribute"
                >
                  +
                </button>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Pontos</div>
              <div>{{ characterSelected.point }}</div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <div>Ataque</div>
              <div>0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoadingBarComponent :isLoading="loading" />
    <AlertComponent :isShow="showModal" :message="message" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
// import type IUserCharacter from '@/interface/IUserCharacter';
import { getCharacterName, getCharacterClassIcon } from '@/utils/utils';
import UserCharacterService from '@/service/UserCharacterService';
import { saveUserCharacter, getUserCharacter, saveUserCharacters } from '@/utils/localStorageUtils';
import LoadingBarComponent from '@/components/LoadingBarComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true
  }
  // characterSelected: {
  //   type: Object as () => IUserCharacter,
  //   required: true
  // }
});

const isModalVisible = ref(false);
const isDisabled = ref(false);
const loading = ref(false);
const showModal = ref(false);
const message = ref('');
const attributeStrength = ref<number | undefined>();
const attributeIntelligence = ref<number | undefined>();
const attributeDexterity = ref<number | undefined>();
const characterSelected = ref(getUserCharacter());

const isStrengthButtonDisabled = computed(() => {
  return (
    !attributeStrength.value ||
    attributeStrength.value < 1 ||
    (characterSelected.value != null && characterSelected.value.point < attributeStrength.value!)
  );
});

const isIntelligenceButtonDisabled = computed(() => {
  return (
    !attributeIntelligence.value ||
    attributeIntelligence.value < 1 ||
    (characterSelected.value != null &&
      characterSelected.value.point < attributeIntelligence.value!)
  );
});

const isDexterityButtonDisabled = computed(() => {
  return (
    !attributeDexterity.value ||
    attributeDexterity.value < 1 ||
    (characterSelected.value != null && characterSelected.value.point < attributeDexterity.value!)
  );
});

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

async function updateAttribute(): Promise<void> {
  try {
    setLoading(true);
    if (characterSelected.value) {
      await UserCharacterService.updateAttribute({
        strength: attributeStrength.value,
        intelligence: attributeIntelligence.value,
        dexterity: attributeDexterity.value
      });
      attributeStrength.value = undefined;
      attributeIntelligence.value = undefined;
      attributeDexterity.value = undefined;
      await getUserCharacterProfile(characterSelected.value.id);
      await getAllUserCharacters();
    }
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      openModal(error.response.data.message);
      setLoading(false);
    }
  }
}

async function getUserCharacterProfile(id: number): Promise<void> {
  try {
    const response = await UserCharacterService.getProfile(id);
    saveUserCharacter(response);
    characterSelected.value = response;
    setLoading(false);
  } catch (error: any) {
    openModal(error);
    setLoading(false);
  }
}

async function getAllUserCharacters(): Promise<void> {
  try {
    const response = await UserCharacterService.getAll();
    saveUserCharacters(response);
  } catch (error: any) {
    openModal(error);
    setLoading(false);
  }
}

function setLoading(value: boolean) {
  isDisabled.value = value;
  loading.value = value;
}

function openModal(ms: string) {
  message.value = ms;
  showModal.value = !showModal.value;
}
</script>

<style scoped>
.modal-dialog {
  margin: 0;
  top: auto;
  left: auto;
  transform: none !important;
}
</style>
