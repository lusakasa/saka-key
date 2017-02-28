import { init } from 'mosi/client';
import { showHelpMenu } from './showHelp';
import { state } from './state';
import { addKeyEventListeners, initKeyHandling } from './keys';

console.log('content script loaded');

// Add KeyboardEvent listeners ASAP so that page listeners don't get loaded first
addKeyEventListeners();

function setEnabled (enabled) {
  state.enabled = enabled;
};

function initContentScript ({ enabled, bindings }) {
  setEnabled(enabled);
  initKeyHandling(bindings);
  console.log(bindings);
};

init({
  subscriptions: ['cs'],
  onConnect: [{ action: 'initContentScript' }],
  actions: {
    initContentScript,
    setEnabled,
    showHelpMenu
  }
});
