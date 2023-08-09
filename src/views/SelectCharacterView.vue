<template>
  <div class="background-container" :style="`background-image: url(${images.selectCharacterBg});`">
    <div class="row m-0">
      <div class="col-sm-3 select pt-3">
        <h3>Selecionar personagem</h3>
      </div>
      <div class="col-sm-6">
        <img
          :src="images.characterWarrior"
          class="img-fluid mx-auto d-block character-img"
          alt="Character image"
        />
      </div>
      <div class="col-sm-3 select pt-3">
        <h3>Lista de personagens</h3>
        <div
          class="card mb-3"
          style="max-width: 540px"
          v-for="character in characterUnavailable"
          :key="character.name"
        >
          <a href="#">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <img
                  :src="character.icon"
                  class="img-fluid mx-auto d-block"
                  alt="Icon image"
                  width="50"
                  height="50"
                />
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
          style="max-width: 540px"
          v-for="index in characterAvailable - characterUnavailable.length"
          :key="index"
        >
          <a href="#">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <img
                  :src="images.iconPlus"
                  class="img-fluid mx-auto d-block"
                  alt="Icon image"
                  width="50"
                  height="50"
                />
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

const characterAvailable = ref(8);
const characterUnavailable = ref<Character[]>([]);

interface Character {
  icon: string;
  name: string;
  level: number;
}

onMounted(() => {
  characterUnavailable.value = [
    {
      icon: images.warriorClass,
      name: 'Personagem 1',
      level: 10
    }
  ];
});
</script>

<style scoped>
.select {
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
</style>
