import { isTextEditable } from 'lib/dom';
import { showHints, hideHints, advanceOnKey } from './HintRenderer';
import { isModifierKey } from 'lib/keys';
import { settings } from './settings';

const MODE = 'HINTS';

export const mode = {
  name: MODE,
  onCreate: () => {},
  onEnter: async (event) => {
    showHints();
  },
  onExit: async (event) => {
    hideHints();
  },
  events: {
    keydown: async (event) => {
      event.stopImmediatePropagation();
      if (!isModifierKey(event)) {
        if (settings.hintCharacters.includes(event.key)) {
          return advanceOnKey(event.key);
        }
        return 'COMMAND';
      }
      return MODE;
    },
    keypress: async (event) => {
      event.stopImmediatePropagation();
      return MODE;
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
      if (SAKA_DEBUG) return MODE;
      if (isTextEditable(event.target)) {
        return 'TEXT';
      }
      return 'COMMAND';
    }
  },
  messages: {}
};
