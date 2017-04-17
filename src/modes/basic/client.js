import { msg } from 'mosi/client';
import { isTextEditable } from 'lib/dom';
import { toggleHelpMenu } from './help';

function calculateNextMode (enabled, currentMode) {
  if (enabled) {
    if (isTextEditable(document.activeElement)) {
      return 'Text';
    } else {
      return 'Command';
    }
  }
  return currentMode;
}

const MODE = 'Basic';

export const mode = {
  name: MODE,
  onCreate: () => {},
  onEnter: async (event) => {},
  onExit: async (event) => {},
  onSettingsChange: ({ enabled }) => {
    const nextMode = calculateNextMode(enabled, MODE);
    msg(0, 'modeAction', { mode: 'Basic', action: 'setMode', arg: nextMode });
  },
  events: {
    keydown: async (event) => MODE,
    keypress: (event) => MODE,
    keyup: (event) => MODE,
    focusin: (event) => MODE,
    focusout: (event) => MODE,
    click: (event) => MODE,
    mousedown: (event) => MODE
  },
  messages: {
    toggleHelpMenu,
    setMode: (mode) => mode
  }
};
