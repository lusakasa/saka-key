import { modeMsg } from 'client/msg';
import { findHints, setHintFindSettings } from './findHints';
import {
  showHints,
  hideHints,
  advanceHints,
  setHintRenderSettings
} from './HintRenderer';

let hints;

export default {
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
    setHintRenderSettings(settings);
    setHintFindSettings(settings);
  },
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
  focus: () => 'TryText',
  mousedown: () => 'Reset',
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
