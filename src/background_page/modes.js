import { msg, meta } from 'mosi/core';
import { getAllActiveProfileOptions, storageGet } from 'options/storage';
import transformOptions from 'options/transform';

export let modes = {};

const defaultModeObject = {
  onOptionsChange: () => {},
  messages: {}
};

export function initModes (availableModes) {
  modes = availableModes;
  Object.keys(availableModes).map((name) => {
    modes[name] = Object.assign({}, defaultModeObject, availableModes[name]);
  });
}

export async function modeMessage ({ mode, action, arg }, src) {
  if (SAKA_DEBUG) {
    if (!modes[mode]) {
      throw Error(`Missing Mode ${mode}`);
    }
    if (!modes[mode].messages[action]) {
      throw Error(`Mode ${mode} is missing a handler for action ${action}`);
    }
  }
  return await modes[mode].messages[action](arg, src);
};

let cachedClientOptions;

export async function onOptionsChange ({ ready } = {}) {
  if (ready) {
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
 * When a client requests settings, messages back the current client settings.
 * Future: domain lookups to determine settings to message back
 */
export function clientOptions (arg, src) {
  msg(src, 'clientOptions', cachedClientOptions);
}

export function loadClient (_, src) {
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
    browser.tabs.executeScript(tabId, {
      file: '/content_script.js',
      frameId,
      runAt: 'document_start',
      matchAboutBlank: true
    });
  }
}

if (SAKA_PLATFORM === 'chrome') {
    /**
   * Requests for the full Saka Client by the client loaders of preloaded tabs are
   * denied because attempting to execute within them would cause errors.
   * http://stackoverflow.com/questions/43665470/cannot-call-chrome-tabs-executescript-into-preloaded-tab-is-this-a-bug-in-chr
   * Instead, the background page listens for the tabs.onReplaced event and executes
   * content_script_loader.js into all frames, which then launches another request for
   * the full Saka Client
   * @param {number} addedTabId
   * @param {number} removedTabId
   */
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
