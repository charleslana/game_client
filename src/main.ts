import App from '@/App.vue';
import DialogComponent from '@/components/DialogComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import router from '@/router';
import { createApp } from 'vue';
import { pinia } from '@/store/pinia';
import { tooltip } from '@/directives/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import '@/assets/main.css';

const app = createApp(App);

app.directive('tooltip', tooltip);

app.use(router);

app.use(pinia);

app.component('LoadingComponent', LoadingComponent);

app.component('DialogComponent', DialogComponent);

app.mount('#app');
