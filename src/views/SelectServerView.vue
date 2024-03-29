<template>
  <div v-if="userDetails">
    <div class="background-container" :style="`background-image: url(${images.bG});`">
      <div class="container">
        <div class="row justify-content-end">
          <div class="col-md-6 mt-3">
            <h3 class="text-shadow">Bem vindo, {{ userDetails.name }}</h3>
          </div>
          <div class="col-md-6 mt-3">
            <h3 class="text-shadow">Selecione o servidor</h3>
            <div class="accordion accordion-flush" id="accordionExample">
              <div class="accordion-item mb-2" v-for="(item, index) in accordionItems" :key="index">
                <h2 class="accordion-header" :id="`heading${index}`">
                  <button
                    class="accordion-button shadow-none"
                    :class="{ collapsed: activeAccordion === index }"
                    type="button"
                    @click="toggleAccordion(index)"
                  >
                    {{ item.title }}
                  </button>
                </h2>
                <div
                  :id="`collapse${index}`"
                  class="accordion-collapse collapse"
                  :class="{ show: activeAccordion === index }"
                  :aria-labelledby="`heading${index}`"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <ul class="list-group" v-if="index < 1">
                      <a href="#">
                        <li
                          class="list-group-item active d-flex justify-content-between align-items-start"
                        >
                          <div class="ms-2 me-auto">{{ item.content }}</div>
                          <div>Vazio</div>
                        </li>
                      </a>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="select-server px-2 w-100 d-flex justify-content-between">
        <div>
          <button class="btn btn-dark text-shadow shadow-none" @click="logout">
            Sair da conta
          </button>
        </div>
        <div>
          <button
            class="btn btn-secondary text-shadow shadow-none"
            :disabled="isSelectServerButtonDisabled"
            @click="$router.push({ name: 'select-character' })"
          >
            Entrar no servidor
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import images from '@/data/imageData';
import { logout, checkLogged } from '@/utils/utils';
import { getUserDetails } from '@/utils/localStorageUtils';

const accordionItems = [
  {
    title: 'Orion',
    content: 'Canal 1'
  },
  {
    title: 'Em breve',
    content: 'Canal 1'
  },
  {
    title: 'Em breve',
    content: 'Canal 1'
  }
];

const activeAccordion = ref<number | null>(0);
const userDetails = getUserDetails();

function toggleAccordion(index: number) {
  if (activeAccordion.value === index) {
    activeAccordion.value = null;
  } else {
    activeAccordion.value = index;
  }
}

const isSelectServerButtonDisabled = computed(() => {
  return !(activeAccordion.value === 0);
});

onMounted(() => checkLogged());
</script>

<style scoped>
.background-container {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
}

h3 {
  color: #bccbd9;
}

.accordion-button.collapsed {
  background: linear-gradient(to right, #3a4571, #232032);
  color: white;
}

.accordion-button:not(.collapsed) {
  background: linear-gradient(to right, #2e283f, #242032);
  color: white;
}

.accordion-button.collapsed::after,
.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.accordion-item {
  border: none;
  background-color: transparent;
}

.accordion-body {
  background-color: rgba(255, 255, 255, 0.2);
}

.select-server {
  position: absolute;
  bottom: 5%;
}

.list-group a {
  text-decoration: none;
}
</style>
