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
        <a href="#" @click="logout">
          <img :src="images.configMenu" alt="Menu icon" height="60" />
        </a>
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
    <LoadingBarComponent :isLoading="loading" />
    <AlertComponent :isShow="showModal" :message="message" />
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import { checkLogged, checkSession, getCharacterClassIcon, formatNumber } from '@/utils/utils';
import { onMounted, ref } from 'vue';
import { getUserCharacter, getUserDetails, removeUserCharacter } from '@/utils/localStorageUtils';
import type IUserCharacter from '@/interface/IUserCharacter';
import type IUser from '@/interface/IUser';
import UserCharacterService from '@/service/UserCharacterService';
import LoadingBarComponent from '@/components/LoadingBarComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import router from '@/router';

const characterSelected = ref<IUserCharacter>();
const userSelected = ref<IUser>();
const loading = ref(false);
const showModal = ref(false);
const message = ref('');

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
  } catch (error: any) {
    openModal(error);
    setLoading(false);
  }
}

function setLoading(value: boolean) {
  loading.value = value;
}

function openModal(ms: string) {
  message.value = ms;
  showModal.value = !showModal.value;
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
</style>
