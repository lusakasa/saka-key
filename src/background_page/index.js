import 'lib/browser_polyfill';
import { init } from 'mosi/core';
import {
  loadClient,
  initModes,
  modeMessage,
  clientSettings,
  storageChange
} from 'background_page/modes';
import { setup } from './setup';
import Basic from 'modes/basic/background';
import Command from 'modes/command/background';
import Hints from 'modes/hints/background';

if (SAKA_DEBUG) {
  console.log('background page initialize begin');
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

initModes({
  Basic,
  Command,
  Hints
});

setup();

if (SAKA_DEBUG) {
  console.log('background page initialized');
}
