import { init, msg, meta } from 'mosi/core';
import { modeMsg } from 'background_page/msg';
import { modeAction } from 'background_page/modes';
import { install } from './install';
import { state } from './state';
import { COMMAND } from 'modes/command/core';
import { UNINITIALIZED } from 'modes/uninitialized/core';
import { initModes } from './modes';

if (SAKA_DEBUG) {
  console.log('background page initialization begin');
}

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
  if (SAKA_DEBUG) {
    console.log(`Loading client: frame: ${frameId}, tab" ${tabId}`);
  }
  chrome.tabs.executeScript(tabId, {
    file: '/content_script.js',
    frameId,
    runAt: 'document_start',
    matchAboutBlank: true
  });
};

function toggleHelpMenu () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    modeMsg(`tab[${tab.id}]&topFrame`, 'toggleHelpMenu');
  });
};

init({
  actions: {
    modeAction,
    getEnabled,
    toggleEnabled,
    loadClient,
    toggleHelpMenu
  }
});

initModes({
  UNINITIALIZED,
  COMMAND
});

if (SAKA_DEBUG) {
  console.log('background page initialized');
}
