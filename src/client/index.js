import { init } from 'mosi/client';
import { initModes, setup, modeMessage, clientSettings } from './modes';
import { mode as Basic } from 'modes/basic/client';
import { mode as Command } from 'modes/command/client';
import { mode as Text } from 'modes/text/client';
import { mode as Hints } from 'modes/hints/client';
import { mode as Developer } from 'modes/developer/client';

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
    actions: {
      modeMessage,
      clientSettings
    }
  });

  const modes = SAKA_DEBUG ? {
    Basic,
    Command,
    Text,
    Hints,
    Developer
  } : {
    Basic,
    Command,
    Text,
    Hints
  };
  // Initialize the built-in modes. New built-in modes should be added here.
  initModes('Basic', modes);

  setup();
}
