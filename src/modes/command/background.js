import { msg } from 'mosi/core';
import { commandTrie } from 'lib/trie';
import {
  nextTab,
  previousTab,
  firstTab,
  lastTab,
  moveTabLeft,
  moveTabRight,
  moveTabFirst,
  moveTabLast,
  closeTab,
  closeOtherTabs,
  closeRightTabs,
  closeLeftTabs,
  newTab,
  restoreTab,
  duplicateTab,
  newWindow,
  switchWindow,
  zoomIn,
  zoomOut,
  zoomReset,
  refreshTab,
  refreshAllTabs,
  toggleMuteTab,
  toggleMuteAllTabs,
  togglePinTab
} from 'saka-commands/tab';


/** The key bindings for command mode */
let bindings;

function loadDefaultKeyBindings () {
  console.log('meow');
  fetch(chrome.runtime.getURL('/config.json'))
    .then((response) => response.json())
    .then((config) => {
      try {
        bindings = commandTrie(config.defaultBindings.bindings);
        console.log(bindings);
      } catch (e) {
        console.error(e);
      }
    });
}

const MODE = 'COMMAND';

// TODO: figure out where to call loadDefaultKeyBindings() on firefox
// because neither onInstall nor onStartup are called when loading in a temp extension
export const mode = {
  name: MODE,
  onInstalled: ({ reason }) => {
    switch (reason) {
      case 'install':
      case 'update':
      case 'chrome_update':
      case 'shared_module_update':
      default:
        loadDefaultKeyBindings();
        break;
    }
  },
  onStartup: () => {
    loadDefaultKeyBindings();
  },
  messages: {
    // key bindings
    bindings: () => bindings,
    // commands
    toggleHelpMenu: () => { msg(0, 'toggleHelpMenu'); },
    nextTab,
    previousTab,
    firstTab,
    lastTab,
    moveTabLeft,
    moveTabRight,
    moveTabFirst,
    moveTabLast,
    closeTab,
    closeOtherTabs,
    closeRightTabs,
    closeLeftTabs,
    newTab,
    restoreTab,
    duplicateTab,
    newWindow,
    switchWindow,
    zoomIn,
    zoomOut,
    zoomReset,
    refreshTab,
    refreshAllTabs,
    toggleMuteTab,
    toggleMuteAllTabs,
    togglePinTab
  }
};
