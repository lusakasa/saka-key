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
} from 'saka-commands/scroll';
import {
  goBack,
  goForward,
  nextPage,
  previousPage,
  goUp,
  goToRoot
} from 'saka-commands/navigation';


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
