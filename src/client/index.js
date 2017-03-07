import { init } from 'mosi/client';
import { initModes, modeAction } from './modes';
import { GLOBAL } from 'modes/global/client';
import { UNINITIALIZED } from 'modes/uninitialized/client';
import { DISABLED } from 'modes/disabled/client';
import { COMMAND } from 'modes/command/client';
import { TEXT } from 'modes/text/client';
import { HINTS } from 'modes/hints/client';

/**
 * Initializes a Saka key client with the given type string (typically components
 * of cs - for content scripts, popup - for the popup, options - for options
 * pages ).
 */
export function initialize (type) {
  console.log(`${type} client loaded`);

  // function initClient ({ enabled, bindings }) {
  //   setEnabled(enabled);
  // };

  init({
    subscriptions: ['client', type],
    // onConnect: [{ action: 'modeAction', arg: { action: 'initClient' } }],
    actions: {
      modeAction
    }
  });

  initModes('UNINITIALIZED', {
    GLOBAL,
    UNINITIALIZED,
    DISABLED,
    COMMAND,
    TEXT,
    HINTS
  });
}
