import { onOptionsChange } from './modes';
import {
  storageInstallProcedure,
  storageUpdateProcedure
} from 'options/procedures';

/**
 * Sets up startup listener, sets up install listener, and executes setup routine
 * When an extension is installed, only the install listener is executed, not the
 * startup listener. The startup listener is called only when chrome is opened.
 * The install listener can be called for a number of reasons.
 * A setup action that should always run whenever the background page starts
 * should NOT be placed in the startup listener.
 */
export async function setup () {
  await initInstallListeners();
  await onOptionsChange();
}

function initInstallListeners () {
  chrome.runtime.onInstalled.addListener(async ({ reason, previousVersion }) => {
    if (SAKA_DEBUG) console.log('install event: ' + reason);
    switch (reason) {
      case 'install':
        await storageInstallProcedure();
        await onOptionsChange();
        chrome.tabs.create({ url: 'info.html' });
        break;
      case 'update':
        await storageUpdateProcedure(previousVersion);
        await onOptionsChange();
        chrome.tabs.create({ url: 'info.html' });
        break;
      case 'chrome_update':
      case 'shared_module_update':
      default:
        break;
    }
  });
}
