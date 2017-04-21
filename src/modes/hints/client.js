import {
  showHints,
  hideHints,
  advanceOnKey,
  setHintStyle
} from './HintRenderer';
import { isModifierKey } from 'lib/keys';

export let hintChars;
export let detectByCursorStyle;
export let horizontalPlacement;
export let verticalPlacement;

export const mode = {
  name: 'Hints',
  onCreate: () => {},
  onEnter: (event) => {
    showHints();
  },
  onExit: (event) => {
    hideHints();
  },
  onSettingsChange: (settings) => {
    setHintStyle(settings.hintCSS, settings.normalCharCSS, settings.activeCharCSS);
    hintChars = settings.hintChars;
    detectByCursorStyle = settings.detectByCursorStyle;
    horizontalPlacement = settings.hintHorizontalPlacement;
    verticalPlacement = settings.hintVerticalPlacement;
  },
  events: {
    keydown: (event) => {
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
      return 'Same';
    },
    keypress: (event) => {
      event.stopImmediatePropagation();
      return 'Same';
    },
    keyup: (event) => 'Same',
    focusout: (event) => 'Same',
    focusin: (event) => 'TryText',
    click: (event) => 'Same',
    mousedown: async (event) => 'Reset'
  },
  messages: {}
};
