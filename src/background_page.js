import { init } from 'mosi/core';
import {
  nextTab, previousTab, firstTab, lastTab,
  moveTabLeft, moveTabRight, moveTabFirst, moveTabLast,
  closeTab, closeOtherTabs, closeRightTabs, closeLeftTabs,
  newTab, restoreTab,
  newWindow, switchWindow,
  zoomIn, zoomOut, zoomReset,
  refreshTab, refreshAllTabs,
  toggleMuteTab, muteAllTabs, unmuteAllTabs,
  togglePinTab
} from 'saka-actions/background-page';

init({
  actions: {
    nextTab,
    previousTab,
    firstTab,
    lastTab,
    moveTabLeft,
    moveTabRight,
    moveTabFirst,
    moveTabLast,
    closeTab,
    closeOtherTabs,
    closeRightTabs,
    closeLeftTabs,
    newTab,
    restoreTab,
    newWindow,
    switchWindow,
    zoomIn,
    zoomOut,
    zoomReset,
    refreshTab,
    refreshAllTabs,
    toggleMuteTab,
    muteAllTabs,
    unmuteAllTabs,
    togglePinTab
  }
});
