<template>
  <div class="background-container" :style="`background-image: url(${images.selectCharacterBg});`">
    <div class="row m-0">
      <div class="col-sm-3 select-a pt-3">
        <div class="d-flex">
          <h3>Selecionar personagem</h3>
          <button
            class="btn btn-dark text-shadow shadow-none"
            @click="$router.push({ name: 'select-server' })"
          >
            Voltar
          </button>
        </div>
        <div class="d-flex flex-column justify-content-center h-100" v-if="characterSelected">
          <div class="card mb-5">
            <div class="card-body">
              <h5 class="card-title">Servidor Orion</h5>
              <p class="card-text info-color">Vazio</p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title title-color">Localização atual</h5>
              <p class="card-text info-color">Tundra infame</p>
            </div>
            <div class="card-body">
              <h5 class="card-title title-color">Criado em</h5>
              <p class="card-text info-color">{{ formatDate(characterSelected.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 position-relative" v-if="characterSelected">
        <img
          :src="characterSelected.image"
          class="img-fluid mx-auto d-block character-img"
          alt="Character image"
        />
        <button
          class="btn btn-secondary text-shadow shadow-none btn-lg centered-button"
          @click="null"
        >
          Iniciar
        </button>
      </div>
      <div class="col-sm-6" v-else></div>
      <div class="col-sm-3 select-b pt-3">
        <h3>Lista de personagens</h3>
        <div
          class="card mb-3"
          v-for="character in userCharacters"
          :key="character.id"
          :class="{ selected: character === characterSelected }"
        >
          <a href="#" @click="selectCharacter(character)">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <div class="card-body">
                  <img
                    :src="character.icon"
                    class="img-fluid mx-auto d-block"
                    alt="Icon image"
                    width="50"
                    height="50"
                  />
                </div>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Nv. {{ character.level }}</h5>
                  <p class="card-text">{{ character.name }}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div
          class="card mb-3"
          v-for="index in characterAvailable - userCharacters.length"
          :key="index"
        >
          <a href="#" @click="$router.push({ name: 'create-character' })">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <div class="card-body">
                  <img
                    :src="images.iconPlus"
                    class="img-fluid mx-auto d-block"
                    alt="Icon image"
                    width="50"
                    height="50"
                  />
                </div>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Criar personagem</h5>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import { onMounted, ref } from 'vue';
import { getCharacterClassIcon, getCharacterImage, formatDate } from '@/utils/utils';

const characterAvailable = ref(8);
const userCharacters = ref<Character[]>([]);
const characterSelected = ref<Character>();

interface Character {
  id: number;
  icon: string;
  name: string;
  level: number;
  image: string;
  createdAt: Date;
}

onMounted(() => {
  userCharacters.value = [
    {
      id: 1,
      icon: getCharacterClassIcon(1),
      name: 'Personagem 1',
      level: 10,
      image: getCharacterImage(1),
      createdAt: new Date()
    },
    {
      id: 2,
      icon: images.warriorClass,
      name: 'Personagem 2',
      level: 100,
      image: getCharacterImage(2),
      createdAt: new Date('2020-05-01')
    }
  ];
  // characterSelected.value = userCharacters.value[0];
});

const selectCharacter = (character: Character) => {
  characterSelected.value = character;
};
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
  overflow: hidden;
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

.centered-button {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
