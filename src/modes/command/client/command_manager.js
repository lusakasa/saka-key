import Trie from 'lib/trie';
import { keyboardEventString } from 'lib/keys';
import { msg } from 'mosi/client';
import {
  scrollDown,
  scrollUp,
  scrollLeft,
  scrollRight,
  scrollPageDown,
  scrollPageUp,
  scrollHalfPageDown,
  scrollHalfPageUp,
  scrollToBottom,
  scrollToTop,
  scrollToLeft,
  scrollToRight
} from './scroll_commands';
import {
  goBack,
  goForward,
  nextPage,
  previousPage,
  goUp,
  goToRoot
} from './navigation_commands';

const backgroundCommand = (action, arg) => () => {
  msg(1, 'modeMessage', { mode: 'Command', action, arg });
};

export const commands = {
  toggleHelpMenu: () => {
    // TODO: REIMPLEMENT PROPERLY
    // msg(1, 'modeMessage', {
    //   mode: 'Basic',
    //   action: 'toggleHelpMenu'
    // });
  },
  showLinkHints: () => 'Hints',
  // scroll commands
  scrollDown,
  scrollUp,
  scrollLeft,
  scrollRight,
  scrollPageDown,
  scrollPageUp,
  scrollHalfPageDown,
  scrollHalfPageUp,
  scrollToBottom,
  scrollToTop,
  scrollToLeft,
  scrollToRight,
  // navigation commands
  goBack,
  goForward,
  nextPage,
  previousPage,
  goUp,
  goToRoot,
  // tab commands
  previousTab: backgroundCommand('previousTab'),
  nextTab: backgroundCommand('nextTab'),
  firstTab: backgroundCommand('firstTab'),
  lastTab: backgroundCommand('lastTab'),
  moveTabLeft: backgroundCommand('moveTabLeft'),
  moveTabRight: backgroundCommand('moveTabRight'),
  moveTabFirst: backgroundCommand('moveTabFirst'),
  moveTabLast: backgroundCommand('moveTabLast'),
  closeTab: backgroundCommand('closeTab'),
  closeOtherTabs: backgroundCommand('closeOtherTabs'),
  closeRightTabs: backgroundCommand('closeRightTabs'),
  closeLeftTabs: backgroundCommand('closeLeftTabs'),
  newTab: backgroundCommand('newTab'),
  restoreTab: backgroundCommand('restoreTab'),
  duplicateTab: backgroundCommand('duplicateTab'),
  newWindow: backgroundCommand('newWindow'),
  switchWindow: backgroundCommand('switchWindow'),
  zoomIn: backgroundCommand('zoomIn'),
  zoomOut: backgroundCommand('zoomOut'),
  zoomReset: backgroundCommand('zoomReset'),
  refreshTab: backgroundCommand('refreshTab'),
  refreshAllTabs: backgroundCommand('refreshAllTabs'),
  toggleMuteTab: backgroundCommand('toggleMuteTab'),
  toggleMuteAllTabs: backgroundCommand('toggleMuteAllTabs'),
  togglePinTab: backgroundCommand('togglePinTab'),
  // developer
  developerMode: () => 'Developer'
};

const trie = new Trie();

export function initInputTrie (root) {
  trie.init(root);
}

export function resetInputTrie () {
  trie.reset();
}

export function advanceInputTrie (event) {
  const command = trie.advance(keyboardEventString(event));
  if (command) {
    const nextMode = commands[command](event);
    if (nextMode) {
      return nextMode;
    }
  }
  return 'Same';
}
