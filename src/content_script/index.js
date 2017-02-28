import { init } from 'mosi/client';
import { toggleHelpMenu } from './helpMenu';
import { state } from './state';
import { addKeyEventListeners, initKeyHandling } from './keys';

addKeyEventListeners();

function setEnabled (enabled) {
  state.enabled = enabled;
};

function initContentScript ({ enabled, bindings }) {
  setEnabled(enabled);
  initKeyHandling(bindings);
};

init({
  subscriptions: ['cs'],
  onConnect: [{ action: 'initContentScript' }],
  actions: {
    initContentScript,
    setEnabled,
    toggleHelpMenu
  }
});
