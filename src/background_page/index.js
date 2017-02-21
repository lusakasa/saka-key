import { init, meta } from 'mosi/core';
import {
  nextTab, previousTab, firstTab, lastTab,
  moveTabLeft, moveTabRight, moveTabFirst, moveTabLast,
  closeTab, closeOtherTabs, closeRightTabs, closeLeftTabs,
  newTab, restoreTab,
  newWindow, switchWindow,
  zoomIn, zoomOut, zoomReset,
  refreshTab, refreshAllTabs,
  toggleMuteTab, toggleMuteAllTabs,
  togglePinTab
} from 'saka-actions/background-page';

let sakaKeyEnabled = true;
const loadSakaKey = (_, src) => {
  if (sakaKeyEnabled) {
    const { frameId, tabId } = meta(src);
    chrome.tabs.executeScript(tabId, {
      file: 'content_script.js',
      frameId,
      runAt: 'document_start'
    });
  }
};

init({
  actions: {
    loadSakaKey,
    // keyboard actions
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
    toggleMuteAllTabs,
    togglePinTab
  }
});
