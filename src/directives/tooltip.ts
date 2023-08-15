import { Tooltip } from 'bootstrap';

export const tooltip = {
  mounted(el: any) {
    new Tooltip(el);
  }
};
