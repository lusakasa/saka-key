import { init } from 'mosi/client';
import { toggleHelpMenu } from './helpMenu';
import { initModes, modeAction } from './modes';
import { UNINITIALIZED } from 'modes/uninitialized';
import { DISABLED } from 'modes/disabled';
import { TEXT } from 'modes/text';
import { COMMAND } from 'modes/command';

/**
 * Initializes a Saka key client with the given type string (typically components
 * of cs - for content scripts, popup - for the popup, options - for options
 * pages ).
 */
export function initialize (type) {
  console.log(`${type} client loaded`);

  initModes('UNINITIALIZED', {
    UNINITIALIZED,
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

  // function initClient ({ enabled, bindings }) {
  //   setEnabled(enabled);
  // };

  init({
    subscriptions: ['client', type],
    onConnect: [{ action: 'modeAction', arg: { action: 'initClient' } }],
    actions: {
      // initClient,
      modeAction,
      setEnabled,
      toggleHelpMenu
    }
  });
}
