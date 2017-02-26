import { init } from 'mosi/client';
import { showHelpMenu } from './showHelp';
import { state } from './state';
import { initKeyHandling } from './keys';

console.log('content script loaded');

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


