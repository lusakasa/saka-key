import Trie from 'lib/trie';
import { keyboardEventString } from 'lib/keys';
import { modeMsg } from 'client/msg';
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

const background = (action, arg) => () => modeMsg(1, 'Command', action, arg);

export const commands = {
  toggleHelpMenu: () => {
    // TODO: REIMPLEMENT PROPERLY
    // msg(1, 'modeMessage', {
    //   mode: 'Basic',
    //   action: 'toggleHelpMenu'
    // });
  },
  passOneKey: (event) => {
    // preventDefault() to suppress keypress event
    // no way to suppress keyup event, so Pass mode must ignore
    // first keyup event
    event.preventDefault();
    event.passKeyType = 'one';
    return 'Pass';
  },
  passAllKeys: (event) => {
    event.preventDefault();
    event.passKeyType = 'all';
    return 'Pass';
  },
  openLink: (event) => {
    event.hintType = 'currentTab';
    return 'Hints';
  },
  openLinkInBackgroundTab: (event) => {
    event.hintType = 'backgroundTab';
    return 'Hints';
  },
  openLinkInForegroundTab: (event) => {
    event.hintType = 'foregroundTab';
    return 'Hints';
  },
  openLinkInNewWindow: (event) => {
    event.hintType = 'newWindow';
    return 'Hints';
  },
  openLinkInIncognitoWindow: (event) => {
    event.hintType = 'incognitoWindow';
    return 'Hints';
  },
  downloadLink: (event) => {
    event.hintType = 'download';
    return 'Hints';
  },
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
  previousTab: background('previousTab'),
  nextTab: background('nextTab'),
  firstTab: background('firstTab'),
  lastTab: background('lastTab'),
  moveTabLeft: background('moveTabLeft'),
  moveTabRight: background('moveTabRight'),
  moveTabFirst: background('moveTabFirst'),
  moveTabLast: background('moveTabLast'),
  closeTab: background('closeTab'),
  closeOtherTabs: background('closeOtherTabs'),
  closeRightTabs: background('closeRightTabs'),
  closeLeftTabs: background('closeLeftTabs'),
  newTab: background('newTab'),
  restoreTab: background('restoreTab'),
  duplicateTab: background('duplicateTab'),
  newWindow: background('newWindow'),
  switchWindow: background('switchWindow'),
  zoomIn: background('zoomIn'),
  zoomOut: background('zoomOut'),
  zoomReset: background('zoomReset'),
  refreshTab: background('refreshTab'),
  refreshAllTabs: background('refreshAllTabs'),
  toggleMuteTab: background('toggleMuteTab'),
  toggleMuteAllTabs: background('toggleMuteAllTabs'),
  togglePinTab: background('togglePinTab'),
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
