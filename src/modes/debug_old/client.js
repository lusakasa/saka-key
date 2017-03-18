import { isTextEditable } from 'lib/dom';
import { showAnchors, hideAnchors,
  showHints, hideHints } from './highlights';

const MODE = 'DEBUG';

export const mode = {
  name: MODE,
  onCreate: () => {},
  onEnter: async (event) => {
    // showToolbar();
    showAnchors();
    showHints();
  },
  onExit: async (event) => {
    // hideToolbar();
    hideAnchors();
    hideHints();
  },
  events: {
    keydown: async (event) => {
      event.stopImmediatePropagation();
      return MODE;
    },
    keypress: async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      return 'COMMAND';
    },
    keyup: async (event) => {
      return MODE;
    },
    focusin: async (event) => {
      if (isTextEditable(event.target)) {
        return 'TEXT';
      }
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
