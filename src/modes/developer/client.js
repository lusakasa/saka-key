import { showMenu, hideMenu } from './ui';

export const mode = {
  name: 'Developer',
  onCreate: () => {},
  onEnter: async (event) => {
    showMenu();
  },
  onExit: async (event) => {
    hideMenu();
  },
  onSettingsChange: (settings) => {},
  events: {
    keydown: (event) => 'Same',
    keypress: (event) => 'Same',
    keyup: (event) => 'Same',
    focusout: (event) => 'Same',
    focusin: (event) => 'Same',
    click: (event) => 'Same',
    mousedown: (event) => 'Same'
  },
  messages: {}
};
