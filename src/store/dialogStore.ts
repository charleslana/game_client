import { defineStore } from 'pinia';

interface State {
  open: boolean;
  message: string;
}

export const useStore = defineStore('dialogStore', {
  state: (): State => ({
    open: false,
    message: ''
  }),
  actions: {
    show(message: string) {
      this.message = message;
      this.open = true;
    },
    hide() {
      this.message = '';
      this.open = false;
    }
  }
});
