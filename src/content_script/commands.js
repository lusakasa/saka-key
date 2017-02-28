import { msg } from 'mosi/client';
import {
  scrollDown, scrollUp, scrollLeft, scrollRight,
  scrollPageDown, scrollPageUp, scrollHalfPageDown, scrollHalfPageUp,
  scrollToBottom, scrollToTop, scrollToLeft, scrollToRight
} from 'saka-actions/content-script';

const backgroundPage = (command, args) => () => { msg(1, command, args); };
export const commands = {
  showHelpMenu: backgroundPage('showHelpMenu'),
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
  previousTab: backgroundPage('previousTab'),
  nextTab: backgroundPage('nextTab'),
  firstTab: backgroundPage('firstTab'),
  lastTab: backgroundPage('lastTab'),
  moveTabLeft: backgroundPage('moveTabLeft'),
  moveTabRight: backgroundPage('moveTabRight'),
  moveTabFirst: backgroundPage('moveTabFirst'),
  moveTabLast: backgroundPage('moveTabLast'),
  closeTab: backgroundPage('closeTab'),
  closeOtherTabs: backgroundPage('closeOtherTabs'),
  closeRightTabs: backgroundPage('closeRightTabs'),
  closeLeftTabs: backgroundPage('closeLeftTabs'),
  newTab: backgroundPage('newTab'),
  restoreTab: backgroundPage('restoreTab'),
  duplicateTab: backgroundPage('duplicateTab'),
  newWindow: backgroundPage('newWindow'),
  switchWindow: backgroundPage('switchWindow'),
  zoomIn: backgroundPage('zoomIn'),
  zoomOut: backgroundPage('zoomOut'),
  zoomReset: backgroundPage('zoomReset'),
  refreshTab: backgroundPage('refreshTab'),
  refreshAllTabs: backgroundPage('refreshAllTabs'),
  toggleMuteTab: backgroundPage('toggleMuteTab'),
  toggleMuteAllTabs: backgroundPage('toggleMuteAllTabs'),
  togglePinTab: backgroundPage('togglePinTab')
};