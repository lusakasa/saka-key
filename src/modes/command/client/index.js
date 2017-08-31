import { initInputTrie, resetInputTrie, advanceInputTrie } from './trie';
import { initScrolling, cancelScroll } from './commands/scroll/utils';
import { setKeyboardSettings, isModifierKey } from 'lib/keys';

export default {
  onEnter: (event) => {
    resetInputTrie();
  },
  onOptionsChange: (options) => {
    setKeyboardSettings(options.physicalKeys, options.ignoreModifierKeys);
    initInputTrie(options.bindings);
    initScrolling(options.smoothScroll, options.scrollStep);
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
