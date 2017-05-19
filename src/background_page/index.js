import { init } from 'mosi/core';
import { modeMessage, clientSettings, storageChange } from 'background_page/modes';
import { mode as Basic } from 'modes/basic/background';
import { mode as Command } from 'modes/command/background';
import { mode as Hints } from 'modes/hints/background';
import { mode as Developer } from 'modes/developer/background';
import { loadClient, setModes } from './modes';
import { setup } from './setup';

// TODO: at some point remove this polyfill or if an npm package is released
// use it, instead of a random github repo
if (SAKA_PLATFORM === 'chrome') {
  require('webextension-polyfill/dist/browser-polyfill');
}

if (SAKA_DEBUG) {
  console.log('background page initialization begin');
}

// initialize messaging system
init({
  log: SAKA_DEBUG,
  actions: {
    loadClient,
    modeMessage,
    clientSettings,
    storageChange
  }
});

setModes({
  Basic,
  Command,
  Hints,
  Developer
});

setup();

if (SAKA_DEBUG) {
  console.log('background page initialized');
}
