import { isTextEditable } from 'lib/dom';
import {
  showHints,
  hideHints,
  advanceOnKey,
  setHintStyle
} from './HintRenderer';
import { isModifierKey } from 'lib/keys';

const MODE = 'Hints';
export let hintChars;
export let detectByCursorStyle;

export const mode = {
  name: MODE,
  onCreate: () => {},
  onEnter: async (event) => {
    showHints();
  },
  onExit: async (event) => {
    hideHints();
  },
  onSettingsChange: ({ hintCSS, normalCharCSS, activeCharCSS, hintChars: chars, detectByCursorStyle: s }) => {
    setHintStyle(hintCSS, normalCharCSS, activeCharCSS);
    hintChars = chars;
    detectByCursorStyle = s;
  },
  events: {
    keydown: async (event) => {
      event.stopImmediatePropagation();
      if (!isModifierKey(event)) {
        if (hintChars.includes(event.key)) {
          // TODO: FIX: next line is shoddy fix to prevent text from being added on entrance to an input
          // e.g. if the last character in a link hint is 'l', without the next line, activating an input
          // will cause l to appear within it.
          event.preventDefault();
          return advanceOnKey(event.key);
        }
        return 'Command';
      }
      return MODE;
    },
    keypress: async (event) => {
      event.stopImmediatePropagation();
      return MODE;
    },
    keyup: (event) => MODE,
    focusin: async (event) => {
      if (isTextEditable(event.target)) {
        return 'Text';
      }
      return MODE;
    },
    focusout: (event) => MODE,
    click: (event) => MODE,
    mousedown: async (event) => {
      if (SAKA_DEBUG) return MODE;
      if (isTextEditable(event.target)) {
        return 'Text';
      }
      return 'Command';
    }
  },
  messages: {}
};
