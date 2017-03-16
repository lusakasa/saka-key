import { init } from 'mosi/core';
import { modeAction } from 'background_page/modes';
import { install } from './install';
import { mode as COMMAND } from 'modes/command/background';
import { mode as UNINITIALIZED } from 'modes/uninitialized/background';
import { mode as BASIC } from 'modes/basic/background';
import { initModes } from './modes';

if (SAKA_DEBUG) {
  console.log('background page initialization begin');
}

install();

init({
  actions: {
    modeAction
  }
});

initModes({
  UNINITIALIZED,
  BASIC,
  COMMAND
});

if (SAKA_DEBUG) {
  console.log('background page initialized');
}
