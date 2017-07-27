import { modeMsg } from 'client/msg';
import { findHints, setHintFindSettings } from './findHints';
import {
  showHints,
  hideHints,
  advanceHints,
  setHintRenderSettings
} from './HintRenderer';
import { showVideoControls, hideVideoControls } from './video';

let hints;
export let hintType;

export default {
  onEnter: (event) => {
    // first frame to enter Hints mode is triggered by a keypress from command mode
    // all other frames must be notified of mode change via message
    if (event.type === 'keydown') {
      modeMsg(1, 'Hints', 'gatherHints', event.hintType);
    }
  },
  onExit: (event) => {
    if (!event.type.startsWith('message')) {
      modeMsg('thisTab&otherFrames', 'Hints', 'exitHintsMode');
    }
    hideHints();
    hideVideoControls();
  },
  onSettingsChange: (settings) => {
    setHintRenderSettings(settings);
    setHintFindSettings(settings);
  },
  keydown: (event) => {
    event.stopImmediatePropagation();
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
  mousedown: () => SAKA_DEBUG ? 'Same' : 'Reset',
  messages: {
    findHints: (ht) => {
      showVideoControls();
      hintType = ht;
      hints = findHints(ht);
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
