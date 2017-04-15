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

let activeProfile = 'standard';
const MODE = 'Command';
// holds the settings for the active profile
// refactor in the future to provide per domain settings map
let settings;

// TODO: figure out where to call loadDefaultKeyBindings() on firefox
// because neither onInstall nor onStartup are called when loading in a temp extension
export const mode = {
  name: MODE,
  onInstalled: (reason) => {
    switch (reason) {
      case 'install':
      case 'update':
      case 'chrome_update':
      case 'shared_module_update':
      default:
        console.log('onInstalled called');
        // loadDefaultKeyBindings();
        break;
    }
  },
  onSettingsChange: (newSettings) => {
    console.log('command mode new settings: ', newSettings);
    settings = commandTrie(newSettings);
  },
  // given user supplied settings in a dict of key-value pairs
  // returns an object that will be passed to the client of this mode when it starts
  // caching is taken care of for you, you're just responsible for defining the function
  // that determines what the client mode gets
  clientSettings: (options, settings) => {
    const keybindings = {};
    options.filter((option) => option.type === 'keybinding').forEach((option) => {
      keybindings[option.key] = settings[option.key];
    });
    return {
      bindings: commandTrie(keybindings)
    };
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
