import { init } from 'mosi/client';
import { toggleHelpMenu } from './helpMenu';
import { modeManager } from './modeManager';
import { DISABLED } from 'modes/disabled';
import { TEXT } from 'modes/text';
import { COMMAND } from 'modes/command';
import { commandTrie } from 'modes/command/commandTrie';

/**
 * Initializes a Saka key client with the given type string (typically components
 * of cs - for content scripts, popup - for the popup, options - for options
 * pages ).
 */
export function initialize (type) {
  console.log(`${type} client loaded`);

  modeManager.init('DISABLED', {
    DISABLED,
    COMMAND,
    TEXT
  });

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
