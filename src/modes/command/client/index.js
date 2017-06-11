import { initInputTrie, resetInputTrie, advanceInputTrie } from './command_manager';
import { initScrolling, cancelScroll } from './scroll_commands';
import { isModifierKey } from 'lib/keys';

export default {
  onEnter: (event) => {
    resetInputTrie();
  },
  onExit: (event) => {
    resetInputTrie();
  },
  onSettingsChange: ({ bindings, smoothScroll, scrollStep }) => {
    initInputTrie(bindings);
    initScrolling(smoothScroll, scrollStep);
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
