import { commandTrie } from './commandTrie';
import { isTextEditable } from 'lib/dom';
import { commands } from './commands';

const MODE = 'COMMAND';

export const mode = {
  name: MODE,
  onCreate: () => {},
  onEnter: async (event) => {
    commandTrie.reset();
  },
  onExit: async (event) => {
    commandTrie.reset();
  },
  events: {
    keydown: async (event) => {
      event.stopImmediatePropagation();
      return MODE;
    },
    keypress: async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const command = commandTrie.advance(event);
      if (command) {
        const nextMode = commands[command]();
        if (nextMode) {
          return nextMode;
        }
      }
      return MODE;
    },
    keyup: async (event) => {
      event.stopImmediatePropagation();
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
