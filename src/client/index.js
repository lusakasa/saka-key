import { init } from 'mosi/client';
import { initModes, modeAction } from './modes';
import { mode as BASIC } from 'modes/basic/client';
import { mode as COMMAND } from 'modes/command/client';
import { mode as TEXT } from 'modes/text/client';
import { mode as HINTS } from 'modes/hints/client';
import { mode as DEVELOPER } from 'modes/developer/client';

/**
 * Initializes a Saka key client, making keyboard shortcuts available.
 * Specify the type of client:
 * * 'cs' - for content scripts
 * * 'popup' - for the popup
 * * 'options' - for options
 * @param {string} type - the type of client
 */
export function initialize (type) {
  if (SAKA_DEBUG) {
    console.log(`${type} client loaded`);
  }

  // Initialize the messaging system
  init({
    subscriptions: ['client', type],
    actions: { modeAction }
  });

  const modes = SAKA_DEBUG ? {
    BASIC,
    COMMAND,
    TEXT,
    HINTS,
    DEVELOPER
  } : {
    BASIC,
    COMMAND,
    TEXT,
    HINTS
  };
  // Initialize the built-in modes. New built-in modes should be added here.
  initModes('BASIC', modes);
}
