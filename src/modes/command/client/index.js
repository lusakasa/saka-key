import { initInputTrie, resetInputTrie, advanceInputTrie } from './command_manager';
import { initScrolling, cancelScroll } from './scroll_commands';
import { setKeyboardSettings, isModifierKey } from 'lib/keys';

export default {
  onEnter: (event) => {
    resetInputTrie();
  },
  onSettingsChange: (settings) => {
    initInputTrie(settings.bindings);
    initScrolling(settings.smoothScroll, settings.scrollStep);
    setKeyboardSettings(settings.physicalKeys, settings.ignoreModifierKeys);
  },
  keydown: (event) => {
    if (event.key !== 'Escape') {
      event.stopImmediatePropagation();
    }
    if (isModifierKey(event)) {
      return 'Same';
    }
    return advanceInputTrie(event);
  },
  keypress: (event) => {
    // NOTE: do not call event.preventDefault();
    // this will break built-in shortcuts on firefox as of 3/2017
    event.stopImmediatePropagation();
    return 'Same';
  },
  keyup: (event) => {
    event.stopImmediatePropagation();
    cancelScroll();
    return 'Same';
  },
  blur: () => 'Reset',
  focus: () => 'Reset'
};
