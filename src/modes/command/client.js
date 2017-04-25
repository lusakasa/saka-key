import { commandTrie } from './commandTrie';
import { isModifierKey } from 'lib/keys';
import { commands } from './commands';

export const mode = {
  name: 'Command',
  onCreate: () => {},
  onEnter: (event) => {
    commandTrie.reset();
  },
  onExit: (event) => {
    commandTrie.reset();
  },
  onSettingsChange: ({ bindings }) => {
    commandTrie.init(bindings);
  },
  events: {
    keydown: (event) => {
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
      return 'Same';
    },
    keypress: (event) => {
      // NOTE: do not call event.preventDefault();
      // this will break built-in shortcuts on firefox as of 3/2017
      event.stopImmediatePropagation();
      return 'Same';
    },
    keyup: (event) => {
      event.stopImmediatePropagation();
      return 'Same';
    },
    blur: (event) => 'Reset',
    focus: (event) => 'Reset',
    click: (event) => 'Same',
    mousedown: (event) => 'Same'
  },
  messages: {}
};
