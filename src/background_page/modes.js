import { msg, meta } from 'mosi/core';
import { getAllActiveProfileOptions, storageGet } from 'storage/storage';
import transformOptions from 'storage/transform';
import {
  storageInstallProcedure,
  storageUpdateProcedure
} from 'storage/procedures';

export let modes = {};

const defaultModeObject = {
  onOptionsChange: () => {},
  messages: {}
};

export function initModes (availableModes, actions) {
  modes = availableModes;
  Object.entries(availableModes).map(([name, mode]) => {
    modes[name] = Object.assign({}, defaultModeObject, mode);
    Object.assign(actions, modes[name].messages);
  });
}

export async function loadClient (_, src) {
  const { sender: { frameId, tab: { index: tabIndex, id: tabId } } } = meta(src);
  // tabIndex === -1 indicates the tab is preloaded but not a full tab
  // attempting to execute into it is an error
  // http://stackoverflow.com/questions/43665470/cannot-call-chrome-tabs-executescript-into-preloaded-tab-is-this-a-bug-in-chr
  if (tabIndex === -1) {
    if (SAKA_DEBUG) {
      console.log(`NOT loading client into preloaded tab: frame: ${frameId}, tab: ${tabId}`);
    }
  } else {
    if (SAKA_DEBUG) {
      console.log(`Loading client: frame: ${frameId}, tab: ${tabId}`);
    }
    await browser.tabs.executeScript(tabId, {
      file: '/content_script.js',
      frameId,
      runAt: 'document_start',
      matchAboutBlank: true
    });
  }
}

/** Reloads all Saka Clients, called on extension updates */
export async function reloadAllClients () {
  const tabs = await browser.tabs.query({});
  for (const tab of tabs) {
    try {
      browser.tabs.executeScript(tab.id, {
        file: '/content_script_loader.js',
        allFrames: true,
        runAt: 'document_start',
        matchAboutBlank: true
      });
    } catch (e) {}
  }
}

// Requests for the full Saka Client by the client loaders of preloaded tabs are
// denied because attempting to execute within them would cause errors.
// http://stackoverflow.com/questions/43665470/cannot-call-chrome-tabs-executescript-into-preloaded-tab-is-this-a-bug-in-chr
// Instead, the background page listens for the tabs.onReplaced event and executes
// content_script_loader.js into all frames, which then launches another request for
// the full Saka Client
if (SAKA_PLATFORM === 'chrome') {
  chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
    if (SAKA_DEBUG) {
      console.log(`Tab id changed from ${removedTabId} to ${addedTabId}. Reloading content_script_loader.js`);
    }
    browser.tabs.executeScript(addedTabId, {
      file: '/content_script_loader.js',
      allFrames: true,
      runAt: 'document_start',
      matchAboutBlank: true
    });
  });
}

let cachedClientOptions;

export function clientOptions (arg, src) {
  msg(src, 'clientOptions', cachedClientOptions);
}

async function onOptionsChange () {
  if ((await storageGet('ready')).ready) {
    const { backgroundOptions, clientOptions } =
    transformOptions(await getAllActiveProfileOptions(), (await storageGet('config')).config);
    Object.values(modes).forEach((mode) => {
      mode.onOptionsChange(backgroundOptions);
    });
    cachedClientOptions = clientOptions;
    msg('client', 'clientOptions', clientOptions);
  }
}

chrome.storage.onChanged.addListener(onOptionsChange);

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
        await reloadAllClients();
        chrome.tabs.create({ url: 'info.html' });
        break;
      case 'update':
        await storageUpdateProcedure(previousVersion);
        await onOptionsChange();
        await reloadAllClients();
        chrome.tabs.create({ url: 'info.html' });
        break;
      case 'chrome_update':
      case 'shared_module_update':
      default:
        break;
    }
  });
}
