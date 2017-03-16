import { msg } from 'mosi/client';

import { commandTrie } from 'modes/command/commandTrie';
import { isTextEditable } from 'lib/dom';

const MODE = 'UNINITIALIZED';

export const mode = {
  name: MODE,
  onEnter: async (event) => {
    msg(1, 'modeAction', {
      mode: MODE,
      action: 'initClient'
    });
  },
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
      return MODE;
    },
    click: async (event) => {
      return MODE;
    },
    mousedown: async (event) => {
      return MODE;
    }
  },
  messages: {
    initClient: ({ enabled, bindings }) => {
      commandTrie.init(bindings);
      if (enabled) {
        if (isTextEditable(document.activeElement)) {
          return 'TEXT';
        } else {
          return 'COMMAND';
        }
      }
      return MODE;
    }
  }
};
