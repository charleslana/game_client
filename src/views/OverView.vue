<template>
  <div
    class="background-container"
    :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${images.mapTundraInfame});`"
  >
    <div class="row m-0 p-2">
      <div class="col-sm-3 m-2">
        <div class="d-flex align-items-center">
          <img :src="images.warriorClass" alt="Icon" height="30" />
          <div class="d-flex flex-column text-shadow ms-2">
            <div>Charles</div>
            <div>Nv. 1</div>
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
      <div class="col-sm-6 m-2">
        <div class="d-flex justify-content-evenly">
          <div class="text-shadow fw-bold d-flex align-items-center">
            <img :src="images.goldIcon" alt="Icon" height="25" class="me-2" />
            <div class="me-2">7.000</div>
            <img :src="images.plusWhiteIcon" alt="Icon" height="25" class="me-2 plus-icon" />
          </div>
          <div class="text-shadow fw-bold d-flex align-items-center">
            <img :src="images.diamondIcon" alt="Icon" height="25" class="me-2" />
            <div class="me-2">667</div>
            <img :src="images.plusWhiteIcon" alt="Icon" height="25" class="me-2 plus-icon" />
          </div>
        </div>
      </div>
      <div class="col-sm-3 m-2"></div>
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
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
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
