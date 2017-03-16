import { init } from 'mosi/core';
import { modeAction } from 'background_page/modes';
import { mode as COMMAND } from 'modes/command/background';
import { mode as BASIC } from 'modes/basic/background';
import { initModes } from './modes';

if (SAKA_DEBUG) {
  console.log('background page initialization begin');
}

init({
  actions: {
    modeAction
  }
});

initModes({
  BASIC,
  COMMAND
});

if (SAKA_DEBUG) {
  console.log('background page initialized');
}
