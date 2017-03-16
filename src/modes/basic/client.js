import { msg } from 'mosi/client';
import { isTextEditable } from 'lib/dom';
import { commandTrie } from 'modes/command/commandTrie';
import { toggleHelpMenu } from './help';

const MODE = 'BASIC';

export const mode = {
  name: MODE,
  onCreate: () => {
    if (SAKA_DEBUG) console.log('initClient requested');
    msg(1, 'modeAction', {
      mode: MODE,
      action: 'initClient'
    });
  },
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
      if (SAKA_DEBUG) {
        console.log(`initClient: enabled=${enabled}, bindings=`, bindings);
      }
      commandTrie.init(bindings);
      if (enabled) {
        if (isTextEditable(document.activeElement)) {
          return 'TEXT';
        } else {
          return 'COMMAND';
        }
      }
      return MODE;
    },
    setEnabled: (enabled) => {
      if (SAKA_DEBUG) {
        console.log(`${enabled ? 'en' : 'dis'}abling Saka Key`);
      }
      if (enabled) {
        if (isTextEditable(document.activeElement)) {
          return 'TEXT';
        }
        return 'COMMAND';
      }
      return MODE;
    },
    toggleHelpMenu
  }
};
