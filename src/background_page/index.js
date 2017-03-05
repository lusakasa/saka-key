import { init, msg, meta } from 'mosi/core';
import { modeMsg } from 'background_page/msg';

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
  msg('popup', 'setEnabled', state.enabled);
  modeMsg('cs', 'setEnabled', state.enabled);
};

function loadClient (_, src) {
  const { frameId, tabId } = meta(src);
  chrome.tabs.executeScript(tabId, {
    file: 'content_script.js',
    frameId,
    runAt: 'document_start',
    matchAboutBlank: true
  });
};

function toggleHelpMenu () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    msg(`tab[${tab.id}]&topFrame`, 'toggleHelpMenu');
  });
};

function modeAction ({ action, arg }, src) {
  switch (action) {
    case 'initClient':
      modeMsg(src, 'initClient', {
        enabled: state.enabled,
        bindings: state.bindings
      });
      break;
    default:
      throw Error('unhandled action');
  }
};

init({
  actions: {
    // for popup
    getEnabled,
    toggleEnabled,
    // for content scripts
    loadClient,
    modeAction,
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
