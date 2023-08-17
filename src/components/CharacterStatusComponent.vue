<template>
  <div v-if="characterSelected">
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
                  @input="onStrengthInput"
                />
                <input
                  type="number"
                  class="form-control mb-2 shadow-none"
                  placeholder="0"
                  v-model="attributeIntelligence"
                  @input="onIntelligenceInput"
                />
                <input
                  type="number"
                  class="form-control mb-2 shadow-none"
                  placeholder="0"
                  v-model="attributeDexterity"
                  @input="onDexterityInput"
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
    <LoadingComponent ref="loadingRef" />
    <DialogComponent ref="dialogRef" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { getCharacterName, getCharacterClassIcon } from '@/utils/utils';
import UserCharacterService from '@/service/UserCharacterService';
import { saveUserCharacter, getUserCharacter, saveUserCharacters } from '@/utils/localStorageUtils';
import LoadingComponent from '@/components/LoadingComponent.vue';
import DialogComponent from '@/components/DialogComponent.vue';
import type { AxiosError } from 'axios';

const open = ref(false);
const isDisabled = ref(false);
const loadingRef = ref<InstanceType<typeof LoadingComponent> | null>(null);
const dialogRef = ref<InstanceType<typeof DialogComponent> | null>(null);
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
  } catch (err: unknown) {
    showError(err);
  }
}

async function getUserCharacterProfile(id: number): Promise<void> {
  try {
    const response = await UserCharacterService.getProfile(id);
    saveUserCharacter(response);
    characterSelected.value = response;
    setLoading(false);
  } catch (err: unknown) {
    showError(err);
  }
}

async function getAllUserCharacters(): Promise<void> {
  try {
    const response = await UserCharacterService.getAll();
    saveUserCharacters(response);
  } catch (err: unknown) {
    showError(err);
  }
}

const onStrengthInput = () => {
  attributeIntelligence.value = undefined;
  attributeDexterity.value = undefined;
  const attribute = attributeStrength;
  if (attribute.value! > characterSelected.value?.point!) {
    attribute.value = characterSelected.value?.point;
  }
  if (attribute.value! < 1) {
    attribute.value = undefined;
  }
};

const onIntelligenceInput = () => {
  attributeStrength.value = undefined;
  attributeDexterity.value = undefined;
  const attribute = attributeIntelligence;
  if (attribute.value! > characterSelected.value?.point!) {
    attribute.value = characterSelected.value?.point;
  }
  if (attribute.value! < 1) {
    attribute.value = undefined;
  }
};

const onDexterityInput = () => {
  attributeStrength.value = undefined;
  attributeIntelligence.value = undefined;
  const attribute = attributeDexterity;
  if (attribute.value! > characterSelected.value?.point!) {
    attribute.value = characterSelected.value?.point;
  }
  if (attribute.value! < 1) {
    attribute.value = undefined;
  }
};

function setLoading(value: boolean) {
  if (value) {
    loadingRef.value?.showLoading();
    return;
  }
  loadingRef.value?.hideLoading();
}

function showError(err: unknown) {
  const error = err as AxiosError<Error>;
  if (error.response && error.response.data.message) {
    dialogRef.value?.show(error.response.data.message);
    setLoading(false);
  }
}

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
