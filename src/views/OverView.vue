<template>
  <div
    v-if="characterSelected && userSelected"
    class="background-container"
    :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${images.mapTundraInfame});`"
  >
    <div class="row m-0 p-2">
      <div class="col-sm-3">
        <div class="d-flex align-items-center">
          <img
            :src="getCharacterClassIcon(characterSelected.character.id)"
            alt="Icon"
            height="30"
          />
          <div class="d-flex flex-column text-shadow ms-2">
            <div>{{ characterSelected.name }}</div>
            <div>Nv. {{ characterSelected.level }}</div>
          </div>
        </div>
        <div>
          <div class="progress position-relative text-shadow">
            <div
              class="progress-bar bg-danger"
              role="progressbar"
              style="width: 100%"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
            <div class="justify-content-center d-flex position-absolute w-100">1.200 / 1.200</div>
          </div>
          <div class="progress position-relative text-shadow">
            <div
              class="progress-bar"
              role="progressbar"
              style="width: 100%"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
            <div class="justify-content-center d-flex position-absolute w-100">1.200 / 1.200</div>
          </div>
          <div class="progress position-relative text-shadow">
            <div
              class="progress-bar bg-warning"
              role="progressbar"
              style="width: 100%"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
            <div class="justify-content-center d-flex position-absolute w-100">100 / 100</div>
          </div>
        </div>
        <div class="d-flex mt-3">
          <a href="#" @click="characterStatusRef?.show">
            <div class="d-flex flex-column align-items-center">
              <img
                :src="getCharacterPortrait(characterSelected.character.id)"
                alt="Character icon"
                width="50"
                class="img-thumbnail"
              />
              <p class="text-shadow">Personagem</p>
            </div>
          </a>
          <a href="#" @click="null">
            <div class="d-flex flex-column align-items-center ms-5">
              <img :src="images.bagMenu" alt="Menu image" width="48" class="img-thumbnail" />
              <p class="text-shadow">Inventário</p>
            </div>
          </a>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="d-flex justify-content-evenly m-2">
          <div
            class="text-shadow fw-bold d-flex align-items-center"
            v-tooltip
            title="Alz"
            data-bs-placement="bottom"
          >
            <img :src="images.goldIcon" alt="Icon" height="25" class="me-2" />
            <div class="me-2">{{ formatNumber(characterSelected.alz) }}</div>
            <img :src="images.plusWhiteIcon" alt="Icon" height="25" class="me-2 plus-icon" />
          </div>
          <div
            class="text-shadow fw-bold d-flex align-items-center"
            v-tooltip
            title="Diamante"
            data-bs-placement="bottom"
          >
            <img :src="images.diamondIcon" alt="Icon" height="25" class="me-2" />
            <div class="me-2">{{ formatNumber(userSelected.credit) }}</div>
            <img :src="images.plusWhiteIcon" alt="Icon" height="25" class="me-2 plus-icon" />
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="d-flex mt-2">
          <a href="#" @click="logout">
            <div class="d-flex flex-column align-items-center">
              <img :src="images.configMenu" alt="Menu icon" width="50" class="img-thumbnail" />
              <p class="text-shadow">Configurações</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="user-details">
      <div class="progress">
        <div
          class="progress-bar bg-success"
          role="progressbar"
          style="width: 50%"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div class="progress">
        <div
          class="progress-bar bg-warning"
          role="progressbar"
          style="width: 25%"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <CharacterStatusComponent ref="characterStatusRef" />
    <LoadingComponent ref="loadingRef" />
    <DialogComponent ref="dialogRef" />
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import {
  checkLogged,
  checkSession,
  getCharacterClassIcon,
  formatNumber,
  getCharacterPortrait
} from '@/utils/utils';
import { onMounted, ref } from 'vue';
import { getUserCharacter, getUserDetails, removeUserCharacter } from '@/utils/localStorageUtils';
import type IUserCharacter from '@/interface/IUserCharacter';
import type IUser from '@/interface/IUser';
import UserCharacterService from '@/service/UserCharacterService';
import LoadingComponent from '@/components/LoadingComponent.vue';
import DialogComponent from '@/components/DialogComponent.vue';
import router from '@/router';
import CharacterStatusComponent from '@/components/CharacterStatusComponent.vue';
import type { AxiosError } from 'axios';

const characterSelected = ref<IUserCharacter>();
const userSelected = ref<IUser>();
const loadingRef = ref<InstanceType<typeof LoadingComponent> | null>(null);
const dialogRef = ref<InstanceType<typeof DialogComponent> | null>(null);
const characterStatusRef = ref<InstanceType<typeof CharacterStatusComponent> | null>(null);

onMounted(() => {
  checkLogged();
  checkSession();
  const userCharacter = getUserCharacter();
  const user = getUserDetails();
  if (userCharacter && user) {
    userSelected.value = user;
    characterSelected.value = userCharacter;
  }
});

async function logout(): Promise<void> {
  try {
    setLoading(true);
    if (characterSelected.value) {
      await UserCharacterService.logout();
      removeUserCharacter();
      router.push({ name: 'select-character' });
    }
  } catch (err: unknown) {
    showError(err);
  }
}

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
</script>

<style scoped>
.background-container {
  width: 100vw;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
}

.plus-icon {
  border: solid 2px rgba(255, 255, 255, 0.1);
  padding: 4px;
  border-radius: 4px;
}

.progress {
  border-radius: 0;
  background-color: #000000;
  height: 20px;
  font-size: 13px;
}

.user-details {
  position: absolute;
  bottom: 0px;
  width: 100%;
}

.user-details .progress {
  height: 5px;
}

a {
  text-decoration: none;
}
</style>
