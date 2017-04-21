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

    // focusout event always happens before focusin event
    // Must account for:
    // 1. focusin event only (document -> input)
    // 2. focusout event only (input -> document)
    // 3. focusout event followed by focusin event (input -> input)

    // event.target is original focused element
    // event.relatedTarget is the newly focused element (if any)
    focusout: async (event) => {
      // console.log('text: focusout event', event);
      if (isTextEditable(event.relatedTarget)) {
        return 'Text';
      }
      return 'Command';
    },
    // event.relatedTarget is the original focused element (if any)
    // event.target is new focused element
    focusin: (event) => {
      // console.log('text: focusin', event);
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
