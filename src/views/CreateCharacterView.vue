<template>
  <div class="background-container" :style="`background-image: url(${images.selectCharacterBg});`">
    <div class="row m-0">
      <div class="col-sm-3 select-a pt-3">
        <div class="d-flex justify-content-between mb-2">
          <h3>Criar personagem</h3>
          <button
            class="btn btn-dark text-shadow shadow-none"
            @click="$router.push({ name: 'select-character' })"
          >
            Voltar
          </button>
        </div>
        <div class="d-flex flex-column justify-content-center" v-if="characterSelected">
          <div class="card">
            <div class="card-body">
              <div class="mb-3">
                <div class="row g-0 align-items-center">
                  <div class="col-md-4">
                    <img
                      :src="getCharacterClassIcon(characterSelected.id)"
                      class="img-fluid mx-auto d-block"
                      alt="Icon image"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{ getCharacterName(characterSelected.id) }}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text">
                {{ characterSelected.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 position-relative" v-if="characterSelected">
        <img
          :src="getCharacterImage(characterSelected.id)"
          class="img-fluid mx-auto d-block character-img p-3"
          alt="Character image"
        />
        <div class="centered card name-custom">
          <form class="p-3" @submit.prevent="create" autocomplete="off">
            <div class="mb-3">
              <label for="nameInput" class="form-label">Nome do personagem</label>
              <input
                type="text"
                class="form-control form-control-lg shadow-none input-custom"
                id="nameInput"
                required
                v-model="name"
              />
            </div>
            <div class="text-center">
              <button
                class="btn btn-secondary text-shadow shadow-none btn-lg"
                :disabled="isButtonDisabled || isDisabled"
                @click="create"
              >
                Criar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-sm-6" v-else></div>
      <div class="col-sm-3 select-b pt-3">
        <div
          class="card mb-3"
          v-for="character in characters"
          :key="character.id"
          :class="{ selected: character === characterSelected }"
        >
          <a href="#" @click="selectCharacter(character)">
            <div
              class="row g-0 align-items-center"
              :class="{ grayscale: character !== characterSelected }"
            >
              <div class="col-md-3">
                <div class="card-body">
                  <img
                    :src="getCharacterClassIcon(character.id)"
                    class="img-fluid mx-auto d-block"
                    alt="Icon image"
                    width="50"
                    height="50"
                  />
                </div>
              </div>
              <div class="col-md-5">
                <div class="card-body">
                  <h5 class="card-title">{{ getCharacterName(character.id) }}</h5>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card-body">
                  <img
                    :src="getCharacterPortrait(character.id)"
                    class="img-fluid mx-auto d-block"
                    alt="Icon image"
                    width="50"
                    height="50"
                  />
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <LoadingComponent ref="loadingRef" />
    <DialogComponent ref="dialogRef" />
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import { computed, onMounted, ref } from 'vue';
import {
  getCharacterClassIcon,
  getCharacterImage,
  getCharacterPortrait,
  getCharacterName,
  checkLogged
} from '@/utils/utils';
import LoadingComponent from '@/components/LoadingComponent.vue';
import DialogComponent from '@/components/DialogComponent.vue';
import router from '@/router';
import type ICharacter from '@/interface/ICharacter';
import { getCharacters, addUserCharacterToList } from '@/utils/localStorageUtils';
import UserCharacterService from '@/service/UserCharacterService';
import type IUserCharacter from '@/interface/IUserCharacter';
import type { AxiosError } from 'axios';

const characters = ref<ICharacter[]>([]);
const characterSelected = ref<ICharacter>();
const isDisabled = ref(false);
const name = ref('');
const loadingRef = ref<InstanceType<typeof LoadingComponent> | null>(null);
const dialogRef = ref<InstanceType<typeof DialogComponent> | null>(null);

const isButtonDisabled = computed(() => {
  return !name.value.trim();
});

onMounted(() => {
  checkLogged();
  const storedCharacters = getCharacters();
  if (storedCharacters) {
    characters.value = storedCharacters;
  }
});

const selectCharacter = (character: ICharacter) => {
  characterSelected.value = character;
  name.value = '';
};

async function create(): Promise<void> {
  try {
    setLoading(true);
    if (characterSelected.value) {
      await UserCharacterService.create(characterSelected.value.id, name.value.trim());
      const userCharacter = await getAllUserCharacters();
      if (userCharacter) {
        await getUserCharacterProfile(userCharacter.id);
      }
      router.push({ name: 'select-character' });
    }
  } catch (err: unknown) {
    showError(err);
  }
}

async function getAllUserCharacters(): Promise<IUserCharacter | null> {
  try {
    const response = await UserCharacterService.getAll();
    return response[0];
  } catch (err: unknown) {
    showError(err);
    return null;
  }
}

async function getUserCharacterProfile(id: number): Promise<void> {
  try {
    const response = await UserCharacterService.getProfile(id);
    addUserCharacterToList(response);
  } catch (err: unknown) {
    showError(err);
  }
}

function setLoading(value: boolean) {
  isDisabled.value = value;
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
</script>

<style scoped>
.background-container {
  background-size: cover;
  background-position: center;
}

.select-a {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  height: 100vh;
  overflow: auto;
}

.select-b {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  height: 100vh;
  overflow: auto;
}

.character-img {
  height: 100vh;
  object-fit: cover;
}

.card a {
  text-decoration: none;
}

.card {
  background: linear-gradient(to right, #192234, #080a13);
  color: white;
}

.selected {
  border: 2px solid #3c73df;
}

.info-color {
  color: #5282af;
}

.title-color {
  color: #54575c;
  font-weight: bold;
}

.centered {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -20%);
}

.form-text {
  color: white;
}

.name-custom {
  background: rgba(0, 0, 0, 0.5);
}

.input-custom {
  background-color: rgba(34, 33, 51, 1);
  border: none;
  color: white;
}

.input-custom:focus {
  background-color: rgba(34, 33, 51, 1);
  color: white;
}
</style>
