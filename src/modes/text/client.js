import { isTextEditable } from 'lib/dom';

const MODE = 'TEXT';

export const mode = {
  name: MODE,
  onCreate: () => {},
  onEnter: async (event) => {},
  onExit: async (event) => {},
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
      if (isTextEditable(event.relatedTarget)) {
        return MODE;
      }
      return 'COMMAND';
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
