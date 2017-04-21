import { commandTrie } from './commandTrie';
import { isTextEditable } from 'lib/dom';
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
    // event.target is original focused element
    // event.relatedTarget is the newly focused element (if any)
    focusout: (event) => {
      // console.log('command: focusout event', event);
      if (isTextEditable(event.relatedTarget)) {
        return 'Text';
      }
      return 'Command';
    },
    // event.relatedTarget is the original focused element (if any)
    // event.target is new focused element
    focusin: async (event) => {
      // console.log('command: focusout event', event);
      if (isTextEditable(event.target)) {
        return 'Text';
      }
      return 'Command';
    },
    click: (event) => MODE,
    mousedown: (event) => MODE
  },
  messages: {}
};
