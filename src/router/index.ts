import CreateCharacterViewVue from '@/views/CreateCharacterView.vue';
import LoginRegisterView from '@/views/LoginRegisterView.vue';
import OverView from '@/views/OverView.vue';
import SelectCharacterView from '@/views/SelectCharacterView.vue';
import SelectServerView from '@/views/SelectServerView.vue';
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
      component: SelectServerView,
      meta: { title: 'Cabal Web - Seleção de servidores' }
    },
    {
      path: '/select-character',
      name: 'select-character',
      component: SelectCharacterView,
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
      component: OverView,
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
