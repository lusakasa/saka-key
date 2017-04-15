import { isTextEditable } from 'lib/dom';

const MODE = 'Text';

export const mode = {
  name: MODE,
  onCreate: () => {},
  onEnter: async (event) => {},
  onExit: async (event) => {},
  onSettingsChange: (settings) => {},
  events: {
    keydown: (event) => MODE,
    keypress: (event) => MODE,
    keyup: (event) => MODE,
    focusin: (event) => MODE,
    focusout: async (event) => {
      if (isTextEditable(event.relatedTarget)) {
        return MODE;
      }
      return 'Command';
    },
    click: (event) => MODE,
    mousedown: (event) => MODE
  },
  messages: {}
};
