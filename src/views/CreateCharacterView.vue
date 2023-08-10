<template>
  <div class="background-container" :style="`background-image: url(${images.selectCharacterBg});`">
    <div class="row m-0">
      <div class="col-sm-3 select-a pt-3">
        <div class="d-flex">
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
                      :src="characterSelected.icon"
                      class="img-fluid mx-auto d-block"
                      alt="Icon image"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{ characterSelected.name }}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
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
        <div class="centered card name-custom">
          <form class="p-3" @submit.prevent="null">
            <div class="mb-3">
              <label for="nameInput" class="form-label">Nome do personagem</label>
              <input
                type="text"
                class="form-control form-control-lg shadow-none input-custom"
                id="nameInput"
              />
            </div>
            <div class="text-center">
              <button class="btn btn-secondary text-shadow shadow-none btn-lg" @click="null">
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
                    :src="character.icon"
                    class="img-fluid mx-auto d-block"
                    alt="Icon image"
                    width="50"
                    height="50"
                  />
                </div>
              </div>
              <div class="col-md-5">
                <div class="card-body">
                  <h5 class="card-title">{{ character.name }}</h5>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card-body">
                  <img
                    :src="character.portrait"
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
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import { onMounted, ref } from 'vue';
import { getCharacterClassIcon, getCharacterImage, getCharacterPortrait } from '@/utils/utils';

const characters = ref<Character[]>();
const characterSelected = ref<Character>();

interface Character {
  id: number;
  icon: string;
  portrait: string;
  name: string;
  image: string;
}

onMounted(() => {
  characters.value = [
    {
      id: 1,
      name: 'Guerreiro',
      icon: getCharacterClassIcon(1),
      portrait: getCharacterPortrait(1),
      image: getCharacterImage(1)
    },
    {
      id: 2,
      name: 'Duelista',
      icon: getCharacterClassIcon(2),
      portrait: getCharacterPortrait(2),
      image: getCharacterImage(2)
    }
  ];
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
  transform: translate(-50%, -50%);
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