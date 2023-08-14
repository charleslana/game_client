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
                  :disabled="isRegisterButtonDisabled"
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
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import images from '@/data/imageData';
import LoadingBarComponent from '@/components/LoadingBarComponent.vue';
import router from '@/router';
import { getLogin, saveLogin, removeLogin } from '@/utils/localStorageUtils';

const isLoginModalOpen = ref(true);
const isRegisterModalOpen = ref(false);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const loading = ref(false);
const isDisabled = ref(false);
const isChecked = ref(false);

const isLoginButtonDisabled = computed(() => {
  return !(email.value && password.value);
});

const isRegisterButtonDisabled = computed(() => {
  return !(email.value && password.value && confirmPassword.value);
});

function toggleModal() {
  isLoginModalOpen.value = !isLoginModalOpen.value;
  isRegisterModalOpen.value = !isRegisterModalOpen.value;
}

async function login() {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    router.push({ name: 'select-server' });
  }, 2000);
}

async function register() {
  console.log('register');
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

const isLoginCheckDisabled = computed(() => {
  return !email.value.trim();
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
