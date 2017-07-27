import { generateCommandTrie } from './trie';
import { setKeyboardSettings } from 'lib/keys';
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

export default {
  clientSettings: (options, settings) => {
    const values = {};
    const errors = {};
    values.physicalKeys = settings.physicalKeys;
    values.smoothScroll = settings.smoothScroll;
    values.scrollStep = settings.scrollStep;
    values.physicalKeys = settings.physicalKeys;
    values.ignoreModifierKeys = settings.ignoreModifierKeys;
    setKeyboardSettings(settings.physicalKeys, settings.ignoreModifierKeys);
    const keybindings = {};
    options.filter((option) => option.type === 'keybinding').forEach((option) => {
      keybindings[option.key] = settings[option.key];
    });
    try {
      values.bindings = generateCommandTrie(keybindings);
    } catch (e) {
      if (e.type === 'conflict') {
        errors[e.command1] = e.message;
        errors[e.command2] = e.message;
      } else throw e;
    }
    return { values, errors };
  },
  messages: {
    // toggleHelpMenu: () => { msg(0, 'toggleHelpMenu'); },
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
