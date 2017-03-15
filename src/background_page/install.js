import { commandTrie } from '../lib/trie';
import { state } from './state';

function loadDefaultKeyBindings () {
  console.log('meow');
  fetch(chrome.runtime.getURL('/config.json'))
    .then((response) => response.json())
    .then((config) => {
      try {
        state.bindings = commandTrie(config.defaultBindings.bindings);
        console.log(state.bindings);
      } catch (e) {
        console.error(e);
      }
    });
}

export function install () {
  loadDefaultKeyBindings();

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
        loadDefaultKeyBindings();
        break;
    }
  });
  chrome.runtime.onStartup.addListener(() => {
    loadDefaultKeyBindings();
  });
}
