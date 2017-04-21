import { commandTrie } from './commandTrie';
import { isModifierKey } from 'lib/keys';
import { commands } from './commands';

const MODE = 'Command';

export const mode = {
  name: MODE,
  onCreate: () => {},
  onEnter: async (event) => {
    commandTrie.reset();
  },
  onExit: async (event) => {
    commandTrie.reset();
  },
  onSettingsChange: ({ bindings }) => {
    commandTrie.init(bindings);
  },
  events: {
    keydown: async (event) => {
      if (event.key !== 'Escape') {
        event.stopImmediatePropagation();
      }
      if (!isModifierKey(event)) {
        const command = commandTrie.advance(event);
        if (command) {
          const nextMode = commands[command]();
          if (nextMode) {
            return nextMode;
          }
        }
      }
      return MODE;
    },
    keypress: async (event) => {
      // NOTE: do not call event.preventDefault();
      // this will break built-in shortcuts on firefox as of 3/2017
      event.stopImmediatePropagation();
      return MODE;
    },
    keyup: async (event) => {
      event.stopImmediatePropagation();
      return MODE;
    },
    focusout: (event) => 'Reset',
    focusin: async (event) => 'Reset',
    click: (event) => MODE,
    mousedown: (event) => MODE
  },
  messages: {}
};
