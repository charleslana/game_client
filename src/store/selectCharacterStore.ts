import { defineStore } from 'pinia';

interface State {
  isNew: boolean;
}

export const useStore = defineStore('selectCharacterStore', {
  state: (): State => ({
    isNew: false
  }),
  actions: {
    show() {
      this.isNew = true;
    },
    hide() {
      this.isNew = false;
    }
  }
});
