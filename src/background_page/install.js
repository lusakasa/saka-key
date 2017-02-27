import { keyboardEventString, validateKeyboardEvent } from '../lib/keys';
import { JSONTrie } from '../lib/trie';
import { state } from './state';

function loadDefaultKeyBindings () {
  fetch(chrome.runtime.getURL('/config.json'))
    .then((response) => response.json())
    .then((config) => {
      const bindingsMap = config.defaultBindings.bindings;
      try {
        state.bindings = JSONTrie(bindingsList(bindingsMap));
      } catch (e) {
        console.error(e);
      }
    });
}

function bindingsList (bindingsMap) {
  const out = [];
  for (const [command, bindings] of Object.entries(bindingsMap)) {
    for (const binding of bindings) {
      const keySequence = binding.map((key) => {
        try {
          validateKeyboardEvent(key);
        } catch (e) {
          throw Error(`Invalid KeyboardEvent descriptor for ${command}: ${e.message}`);
        }
        return keyboardEventString(key);
      });
      out.push([keySequence, command]);
    }
  }
  return out;
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
