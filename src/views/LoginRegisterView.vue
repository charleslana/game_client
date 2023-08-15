<template>
  <div class="background-container" :style="`background-image: url(${images.bG});`">
    <div class="container d-flex justify-content-center pt-5">
      <img :src="images.logo" class="img-fluid" alt="Logo image" />
    </div>
    <div
      class="modal fade"
      :class="{ show: isLoginModalOpen }"
      :style="{ display: isLoginModalOpen ? 'block' : 'none' }"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header justify-content-center">
            <h5 class="modal-title text-shadow">Logar na conta</h5>
          </div>
          <div class="modal-body">
            <form class="mb-3" @submit.prevent="login">
              <div class="mb-3">
                <input
                  type="email"
                  class="form-control form-control-lg shadow-none text-shadow"
                  placeholder="E-mail"
                  required
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control form-control-lg shadow-none text-shadow"
                  placeholder="Senha"
                  required
                  v-model="password"
                />
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  v-model="isChecked"
                  @change="changeLogin"
                  :disabled="isLoginCheckDisabled"
                />
                <label class="form-check-label" for="flexCheckDefault"> Salvar e-mail </label>
              </div>
              <div class="text-center">
                <button
                  class="btn btn-secondary btn-lg text-shadow shadow-none"
                  :disabled="isLoginButtonDisabled || isDisabled"
                >
                  Logar
                </button>
              </div>
            </form>
            <a href="#" @click="toggleModal">Cadastrar uma nova conta</a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      :class="{ show: isRegisterModalOpen }"
      :style="{ display: isRegisterModalOpen ? 'block' : 'none' }"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header justify-content-center">
            <h5 class="modal-title text-shadow">Cadastrar uma nova conta</h5>
          </div>
          <div class="modal-body">
            <form class="mb-3" @submit.prevent="register">
              <div class="mb-3">
                <input
                  type="email"
                  class="form-control form-control-lg shadow-none text-shadow"
                  placeholder="E-mail"
                  required
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control form-control-lg shadow-none text-shadow"
                  placeholder="Senha"
                  required
                  v-model="password"
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control form-control-lg shadow-none text-shadow"
                  placeholder="Repita a senha"
                  required
                  v-model="confirmPassword"
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control form-control-lg shadow-none text-shadow"
                  placeholder="Nome"
                  required
                  v-model="name"
                />
              </div>
              <div class="text-center">
                <button
                  class="btn btn-secondary btn-lg text-shadow shadow-none"
                  :disabled="isRegisterButtonDisabled || isDisabled"
                >
                  Cadastrar
                </button>
              </div>
            </form>
            <a href="#" @click="toggleModal">Entrar na conta</a>
          </div>
        </div>
      </div>
    </div>
    <LoadingBarComponent :isLoading="loading" />
    <AlertComponent :isShow="showModal" :message="message" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import images from '@/data/imageData';
import LoadingBarComponent from '@/components/LoadingBarComponent.vue';
import router from '@/router';
import {
  getLogin,
  saveLogin,
  removeLogin,
  saveToken,
  saveCharacters,
  saveUserDetails,
  saveUserCharacters
} from '@/utils/localStorageUtils';
import PublicService from '@/service/PublicService';
import AlertComponent from '@/components/AlertComponent.vue';
import CharacterService from '@/service/CharacterService';
import UserService from '@/service/UserService';
import UserCharacterService from '@/service/UserCharacterService';

const isLoginModalOpen = ref(true);
const isRegisterModalOpen = ref(false);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const loading = ref(false);
const isDisabled = ref(false);
const isChecked = ref(false);
const showModal = ref(false);
const message = ref('');

const isLoginButtonDisabled = computed(() => {
  return !(email.value && password.value);
});

const isRegisterButtonDisabled = computed(() => {
  return !(
    email.value &&
    password.value &&
    confirmPassword.value &&
    name.value &&
    password.value === confirmPassword.value
  );
});

const isLoginCheckDisabled = computed(() => {
  return !email.value.trim();
});

function toggleModal() {
  isLoginModalOpen.value = !isLoginModalOpen.value;
  isRegisterModalOpen.value = !isRegisterModalOpen.value;
}

async function login(): Promise<void> {
  try {
    setLoading(true);
    const response = await PublicService.login({
      email: email.value,
      password: password.value
    });
    saveToken(response.token);
    await getAllCharacters();
    await getUserDetails();
    await getAllUserCharacters();
    router.push({ name: 'select-server' });
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      openModal(error.response.data.message);
      setLoading(false);
    }
  }
}

async function register(): Promise<void> {
  try {
    setLoading(true);
    const response = await PublicService.register({
      email: email.value,
      password: password.value,
      name: name.value
    });
    if (response.error) {
      openModal(response.message);
      return;
    }
    await login();
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      openModal(error.response.data.message);
      setLoading(false);
    }
  }
}

async function getAllCharacters(): Promise<void> {
  try {
    const response = await CharacterService.getAll();
    saveCharacters(response);
  } catch (error: any) {
    openModal(error);
    setLoading(false);
  }
}

async function getUserDetails(): Promise<void> {
  try {
    const response = await UserService.getDetails();
    saveUserDetails(response);
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

onMounted(() => {
  checkLogin();
});

function checkLogin() {
  const login = getLogin();
  if (login != null) {
    isChecked.value = true;
    email.value = login;
  }
}

function changeLogin() {
  if (!isChecked.value) {
    removeLogin();
    return;
  }
  saveLogin(email.value);
}

function openModal(ms: string) {
  message.value = ms;
  showModal.value = !showModal.value;
}

watch(email, (newEmail, oldEmail) => {
  if (isChecked.value && newEmail !== oldEmail) {
    saveLogin(newEmail);
  }
});
</script>

<style scoped>
.background-container {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
}
</style>
