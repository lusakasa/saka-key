import { modeMsg } from 'client/msg';
import {
  showHints,
  hideHints,
  advanceHints,
  setHintStyle
} from './HintRenderer';
import { findHints } from './findHints';

export let detectByCursorStyle;
export let horizontalPlacement;
export let verticalPlacement;

let hints;

export const mode = {
  name: 'Hints',
  onCreate: () => {},
  onEnter: (event) => {
    // first frame to enter Hints mode is triggered by a keypress from command mode
    // all other frames must be notified of mode change via message
    if (event.type === 'keydown') {
      modeMsg(1, 'Hints', 'gatherHints');
    }
  },
  onExit: (event) => {
    if (!event.type.startsWith('message')) {
      modeMsg('thisTab&otherFrames', 'Hints', 'exitHintsMode');
    }
    hideHints();
  },
  onSettingsChange: (settings) => {
    setHintStyle(settings.hintCSS, settings.hintNormalCharCSS, settings.hintActiveCharCSS);
    detectByCursorStyle = settings.hintDetectByCursorStyle;
    horizontalPlacement = settings.hintHorizontalPlacement;
    verticalPlacement = settings.hintVerticalPlacement;
  },
  events: {
    keydown: (event) => {
      event.stopImmediatePropagation();
      // TODO: FIX: next line is shoddy fix to prevent text from being added on entrance to an input
      // e.g. if the last character in a link hint is 'l', without the next line, activating an input
      // will cause l to appear within it.
      event.preventDefault();
      modeMsg(1, 'Hints', 'processKey', {
        key: event.key,
        code: event.code,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey
      });
      return 'Same';
    },
    keypress: (event) => {
      event.stopImmediatePropagation();
      return 'Same';
    },
    keyup: (event) => 'Same',
    blur: (event) => 'Same',
    focus: (event) => 'TryText',
    click: (event) => 'Same',
    mousedown: async (event) => 'Reset'
  },
  messages: {
    findHints: () => {
      hints = findHints();
      return {
        nextMode: 'Hints',
        value: hints.length
      };
    },
    renderHints: (hintStrings) => {
      showHints(hints, hintStrings);
      hints = undefined;
    },
    exitHintsMode: () => ({ nextMode: 'Reset' }),
    advanceHints: (key) => {
      const nextMode = advanceHints(key);
      return {
        nextMode: nextMode === 'Filtered' ? 'Same' : nextMode,
        value: nextMode
      };
    }
  }
};
