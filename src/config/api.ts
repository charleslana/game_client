import axios, { AxiosError } from 'axios';
import router from '@/router';
import { getToken, removeToken, removeUserCharacter } from '@/utils/localStorageUtils';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const token = getToken();
    let excludedRoutes = ['login-register'];
    if (
      error.response?.status === 401 &&
      !token &&
      !excludedRoutes.includes(router.currentRoute.value.name as string)
    ) {
      removeToken();
      router.push({ name: 'login-register' });
    }
    excludedRoutes = ['select-server'];
    if (
      error.response?.status === 403 &&
      !excludedRoutes.includes(router.currentRoute.value.name as string)
    ) {
      removeUserCharacter();
      router.push({ name: 'select-server' });
    }
    return Promise.reject(error);
  }
);

export default api;
