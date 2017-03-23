import { init } from 'mosi/core';
import { modeAction } from 'background_page/modes';
import { mode as Basic } from 'modes/basic/background';
import { mode as Command } from 'modes/command/background';
import { mode as Hints } from 'modes/hints/background';
import { mode as Developer } from 'modes/developer/background';
import { initModes } from './modes';

// TODO: at some point remove this polyfill or if an npm package is released
// use it, instead of a random github repo
if (SAKA_PLATFORM === 'chrome') {
  require('webextension-polyfill/dist/browser-polyfill');
}

if (SAKA_DEBUG) {
  console.log('background page initialization begin');
}

init({
  actions: {
    modeAction
  }
});

initModes({
  Basic,
  Command,
  Hints,
  Developer
});

if (SAKA_DEBUG) {
  console.log('background page initialized');
}
