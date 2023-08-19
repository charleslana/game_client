import { defineStore } from 'pinia';

interface State {
  isLoading: boolean;
}

export const useStore = defineStore('loadingStore', {
  state: (): State => ({
    isLoading: false
  }),
  actions: {
    showLoading() {
      this.isLoading = true;
    },
    hideLoading() {
      this.isLoading = false;
    }
  }
});
