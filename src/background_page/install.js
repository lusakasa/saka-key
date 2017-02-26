import { keyboardEventString } from '../lib/keys';
import { JSONTrie } from '../lib/trie';
import { state } from './state';


function loadDefaultKeyBindings () {
  fetch(chrome.runtime.getURL('/config.json'))
    .then((response) => response.json())
    .then((config) => {
      const bindingsMap = config.defaultBindings.bindings;
      try {
        state.bindings = JSONTrie(getBindings(bindingsMap));
      } catch (e) {
        console.error(e);
      }
    });
}


function getBindings (bindingsMap) {
  const serializedKeySequenceMap = {};
  const keySequenceMap = new Map();
  if (Object.keys(bindingsMap).length === 0) return keySequenceMap;
  // 1. Generate a map from keybindings to commands ensuring no key binding is mapped more than once
  for (const [command, bindings] of Object.entries(bindingsMap)) {
    for (const binding of bindings) {
      const keySequence = binding.map((keyDescriptor) => keyboardEventString(keyDescriptor));
      keySequenceMap.set(keySequence, command);
      const serializedKeySequence = keySequence.join('__');
      const exisitingMappedCommand = serializedKeySequenceMap[serializedKeySequence];
      if (exisitingMappedCommand) {
        throw Error(`${command} and ${exisitingMappedCommand} are both mapped to ${serializedKeySequence}`);
      } else {
        serializedKeySequenceMap[serializedKeySequence] = command;
      }
    }
  }
  // 2. Ensure Trie property holds (no key binding is a prefix of any other)
  const sortedBindings = Object.keys(serializedKeySequenceMap).sort();
  let prevBinding = sortedBindings[0];
  for (let i = 1; i < sortedBindings.length; i++) {
    const curBinding = sortedBindings[i];
    if (curBinding.startsWith(prevBinding)) {
      throw Error(`The binding ${prevBinding} of ${serializedKeySequenceMap[prevBinding]}
      is a prefix of the binding ${curBinding} of ${serializedKeySequenceMap[curBinding]}`);
    }
    prevBinding = curBinding;
  }
  return keySequenceMap;
}

export function install () {
  chrome.runtime.onInstalled.addListener(({ reason }) => {
    console.log('installing');
    switch (reason) {
      case 'install':
        loadDefaultKeyBindings();
        break;
      case 'update':
        loadDefaultKeyBindings();
        break;
      case 'chrome_update':
      case 'shared_module_update':
      default:
        break;
    }
  });
}
