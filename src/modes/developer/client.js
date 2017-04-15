import { showMenu, hideMenu } from './ui';

const MODE = 'Developer';

export const mode = {
  name: MODE,
  onCreate: () => {},
  onEnter: async (event) => {
    showMenu();
  },
  onExit: async (event) => {
    hideMenu();
  },
  onSettingsChange: (settings) => {},
  events: {
    keydown: async (event) => {
      return MODE;
    },
    keypress: async (event) => {
      return MODE;
    },
    keyup: async (event) => {
      return MODE;
    },
    focusin: async (event) => {
      return MODE;
    },
    focusout: async (event) => {
      return MODE;
    },
    click: async (event) => {
      return MODE;
    },
    mousedown: async (event) => {
      return MODE;
    }
  },
  messages: {}
};
