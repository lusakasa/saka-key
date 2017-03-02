import { init, msg, meta } from 'mosi/core';
import {
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
  duplicateTab,
  newWindow,
  switchWindow,
  zoomIn, zoomOut,
  zoomReset,
  refreshTab,
  refreshAllTabs,
  toggleMuteTab,
  toggleMuteAllTabs,
  togglePinTab
} from 'saka-commands/tab-actions';
import { state } from './state';
import { install } from './install';

install();


function getEnabled (_, src) {
  msg(src, 'setEnabled', state.enabled);
};

function toggleEnabled () {
  state.enabled = !state.enabled;
  msg('client;popup', 'setEnabled', state.enabled);
};

function loadClient (_, src) {
  const { frameId, tabId } = meta(src);
  chrome.tabs.executeScript(tabId, {
    file: 'content_script.js',
    frameId,
    runAt: 'document_start'
  });
};

function toggleHelpMenu () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    msg(`tab[${tab.id}].topFrame`, 'toggleHelpMenu');
  });
};

function initClient (_, src) {
  msg(src, 'initClient', {
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
    loadClient,
    initClient,
    toggleHelpMenu,
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
    duplicateTab,
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
