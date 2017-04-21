import { toggleHelpMenu } from './help';

/**
 * The de facto disabled mode (note how all handlers return the current mode)
 */
const MODE = 'Basic';

export const mode = {
  name: MODE,
  onCreate: () => {},
  onEnter: (event) => {},
  onExit: (event) => {},
  onSettingsChange: (settings) => {},
  events: {
    keydown: (event) => MODE,
    keypress: (event) => MODE,
    keyup: (event) => MODE,
    focusout: (event) => MODE,
    focusin: (event) => MODE,
    click: (event) => MODE,
    mousedown: (event) => MODE
  },
  messages: {
    toggleHelpMenu,
    setMode: (mode) => mode
  }
};
