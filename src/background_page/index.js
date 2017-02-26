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

const config = {
  enabled: true
};


function getEnabled (_, src) {
  msg(src, 'setEnabled', config.enabled);
};

function toggleEnabled () {
  config.enabled = !config.enabled;
  msg('cs;popup', 'setEnabled', config.enabled);
};

function loadContentScript (_, src) {
  const { frameId, tabId } = meta(src);
  chrome.tabs.executeScript(tabId, {
    file: 'content_script.js',
    frameId,
    runAt: 'document_start'
  });
};

function requestShowHelpMenu () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    msg(`tab[${tab.id}].topFrame`, 'showHelpMenu');
  });
};

const bindings = {
  a: 'asf'
};

function initContentScript (_, src) {
  msg(src, 'initContentScript', {
    enabled: config.enabled,
    bindings
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
    requestShowHelpMenu,
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
