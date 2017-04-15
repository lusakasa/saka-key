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
    keydown: (event) => MODE,
    keypress: (event) => MODE,
    keyup: (event) => MODE,
    focusin: (event) => MODE,
    focusout: (event) => MODE,
    click: (event) => MODE,
    mousedown: (event) => MODE
  },
  messages: {}
};
