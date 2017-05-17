import { msg } from 'mosi/core';
import { commandTrie } from './trie';
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
} from './tab_commands';

export const mode = {
  name: 'Command',
  onInstalled: (reason) => {},
  clientSettings: (options, settings) => {
    const values = {};
    const errors = {};
    values.smoothScroll = settings.smoothScroll;
    // scrollStep
    const scrollStep = parseFloat(settings.scrollStep);
    if (isNaN(scrollStep) || scrollStep < 1 || scrollStep % 1 !== 0) {
      errors.scrollStep = 'Scroll Step must be a positive whole number';
    } else {
      values.scrollStep = scrollStep;
    }
    // key bindings
    const keybindings = {};
    options.filter((option) => option.type === 'keybinding').forEach((option) => {
      keybindings[option.key] = settings[option.key];
    });
    try {
      values.bindings = commandTrie(keybindings);
    } catch (e) {
      if (e.type === 'conflict') {
        errors[e.command1] = e.message;
        errors[e.command2] = e.message;
      } else throw e;
    }
    return { values, errors };
  },
  messages: {
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
