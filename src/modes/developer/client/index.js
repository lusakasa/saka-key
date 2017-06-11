import { showMenu, hideMenu } from './ui';

export default {
  onEnter: () => {
    showMenu();
  },
  onExit: () => {
    hideMenu();
  }
};
