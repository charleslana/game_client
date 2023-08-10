import CreateCharacterViewVue from '@/views/CreateCharacterView.vue';
import LoginRegisterView from '@/views/LoginRegisterView.vue';
import OverViewVue from '@/views/OverView.vue';
import SelectCharacterViewVue from '@/views/SelectCharacterView.vue';
import SelectServerViewVue from '@/views/SelectServerView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login-register',
      component: LoginRegisterView,
      meta: { title: 'Cabal Web' }
    },
    {
      path: '/select-server',
      name: 'select-server',
      component: SelectServerViewVue,
      meta: { title: 'Cabal Web - Seleção de servidores' }
    },
    {
      path: '/select-character',
      name: 'select-character',
      component: SelectCharacterViewVue,
      meta: { title: 'Cabal Web - Seleção de personagens' }
    },
    {
      path: '/create-character',
      name: 'create-character',
      component: CreateCharacterViewVue,
      meta: { title: 'Cabal Web - Criar personagem' }
    },
    {
      path: '/overview',
      name: 'overview',
      component: OverViewVue,
      meta: { title: 'Cabal Web - Visão Geral' }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
});

interface RouteMeta {
  title?: string;
}

router.beforeEach((to, _from, next) => {
  const meta = to.meta as RouteMeta;
  if (meta && meta.title) {
    document.title = meta.title;
  } else {
    document.title = 'Cabal Web - Algum erro aconteceu';
  }
  next();
});

export default router;
