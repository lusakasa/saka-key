import { toggleHelpMenu } from './help';

/**
 * The de facto disabled mode (note how all handlers return the current mode)
 */

export const mode = {
  name: 'Basic',
  onEnter: (event) => {},
  onExit: (event) => {},
  onSettingsChange: (settings) => {},
  events: {
    keydown: (event) => 'Same',
    keypress: (event) => 'Same',
    keyup: (event) => 'Same',
    blur: (event) => 'Same',
    focus: (event) => 'Same',
    click: (event) => 'Same',
    mousedown: (event) => 'Same'
  },
  messages: {
    toggleHelpMenu,
    setMode: (mode) => mode
  }
};
