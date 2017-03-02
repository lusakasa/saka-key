import { init } from 'mosi/client';
import { toggleHelpMenu } from './helpMenu';
import { addEventListeners } from './modes';
import { commandTrie } from './commandTrie';

/**
 * Initializes a Saka key client with the given type string (typically components
 * of cs - for content scripts, popup - for the popup, options - for options
 * pages ).
 */
export function initialize (type) {
  console.log(`${type} client loaded`);

  addEventListeners();

  function setEnabled (enabled) {
    const event = new CustomEvent('saka', {
      detail: {
        enabled,
        class: 'toggleEnabled'
      }
    });
    document.dispatchEvent(event);
  };

  function initClient ({ enabled, bindings }) {
    setEnabled(enabled);
    commandTrie.init(bindings);
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
