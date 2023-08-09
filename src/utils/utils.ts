import router from '@/router';

export function logout() {
  router.push({ name: 'login-register' });
}
