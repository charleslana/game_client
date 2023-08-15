import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import { tooltip } from './directives/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css';

const app = createApp(App);

app.directive('tooltip', tooltip);

app.use(router);

app.mount('#app');
