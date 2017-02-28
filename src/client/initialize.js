import { init } from 'mosi/client';
import { toggleHelpMenu } from './helpMenu';
import { state } from './state';
import { addKeyEventListeners, initKeyHandling } from './keys';

export function initialize (type) {
  console.log(`${type} client loaded`);

  addKeyEventListeners();

  function setEnabled (enabled) {
    state.enabled = enabled;
  };

  function initClient ({ enabled, bindings }) {
    setEnabled(enabled);
    initKeyHandling(bindings);
  };

  init({
    subscriptions: ['client', type],
    onConnect: [{ action: 'initClient' }],
    actions: {
      initClient,
      setEnabled,
      toggleHelpMenu
    }
  });
}
