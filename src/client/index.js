import { init } from 'mosi/client';
import { initModes, setup, changeMode, modeMessage, clientOptions } from './modes';
import Basic from 'modes/basic/client';
import Command from 'modes/command/client';
import Pass from 'modes/pass/client';
import Text from 'modes/text/client';
import Hints from 'modes/hints/client';
import Developer from 'modes/developer/client';

/**
 * Initializes a Saka key client, making keyboard shortcuts available.
 * Specify the type of client:
 * * 'cs' - for content scripts
 * * 'popup' - for the popup
 * * 'options' - for options
 * @param {string} type - the type of client
 */
export function initialize (type, actions = {}) {
  if (SAKA_DEBUG) {
    console.log(`${type} client loaded`);
  }

  // Initialize the messaging system
  init({
    log: SAKA_DEBUG,
    subscriptions: ['client', type],
    actions: {
      ...actions,
      changeMode,
      modeMessage,
      clientOptions
    }
  });

  const modes = SAKA_DEBUG ? {
    Basic,
    Command,
    Pass,
    Text,
    Hints,
    Developer
  } : {
    Basic,
    Command,
    Pass,
    Text,
    Hints
  };
  // Initialize the built-in modes. New built-in modes should be added here.
  initModes('Basic', modes);

  setup(type);
}
