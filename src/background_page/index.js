import { init } from 'mosi/core';
import { modeAction } from 'background_page/modes';
import { mode as BASIC } from 'modes/basic/background';
import { mode as COMMAND } from 'modes/command/background';
import { mode as HINTS } from 'modes/hints/background';
import { mode as DEVELOPER } from 'modes/developer/background';
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
  COMMAND,
  HINTS,
  DEVELOPER
});

if (SAKA_DEBUG) {
  console.log('background page initialized');
}
