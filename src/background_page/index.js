import { init, msg, meta } from 'mosi/core';
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
import { state } from './state';
import { install } from './install';

install();


function getEnabled (_, src) {
  msg(src, 'setEnabled', state.enabled);
};

function toggleEnabled () {
  state.enabled = !state.enabled;
  msg('cs;popup', 'setEnabled', state.enabled);
};

function loadContentScript (_, src) {
  const { frameId, tabId } = meta(src);
  chrome.tabs.executeScript(tabId, {
    file: 'content_script.js',
    frameId,
    runAt: 'document_start'
  });
};

function showHelpMenu () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    msg(`tab[${tab.id}].topFrame`, 'showHelpMenu');
  });
};

function initContentScript (_, src) {
  msg(src, 'initContentScript', {
    enabled: state.enabled,
    bindings: state.bindings
  });
};

init({
  actions: {
    // for popup
    getEnabled,
    toggleEnabled,
    // for content scripts
    loadContentScript,
    initContentScript,
    showHelpMenu,
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
