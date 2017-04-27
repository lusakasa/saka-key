import { msg, meta } from 'mosi/core';
export let modes = {};

export function setModes (availableModes) {
  modes = availableModes;
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


export let cachedClientSettings;

/**
 * When a client requests settings, messages back the current client settings.
 * Future: domain lookups to determine settings to message back
 */
export function clientSettings (arg, src) {
  msg(src, 'clientSettings', cachedClientSettings);
}

export async function regenerateClientSettings () {
  cachedClientSettings = await generateClientSettings();
  if (SAKA_DEBUG) console.log('New clientSettings generated: ', cachedClientSettings);
  msg('client', 'clientSettings', cachedClientSettings);
}

async function generateClientSettings () {
  try {
    const {
      activeProfileGroup,
      profileGroups,
      settings,
      modes: modesConfig
    } = await browser.storage.local.get([
      'activeProfileGroup',
      'profileGroups',
      'settings',
      'modes'
    ]);
    const profileMap = profileGroups.find(({ name }) => name === activeProfileGroup).settings;
    const clientSettings = {};
    Object.entries(profileMap).forEach(([mode, profile]) => {
      const options = modesConfig.find(({ name }) => name === mode).options;
      const modeSettings = settings[mode].find(({ name }) => name === profileMap[mode]).settings;
      const { values, errors } = modes[mode].clientSettings(options, modeSettings);
      Object.assign(clientSettings, values);
    });
    return clientSettings;
  } catch (error) {
    console.error(error);
    return error.message;
  }
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
function reloadClientLoaders (addedTabId, removedTabId) {
  if (SAKA_DEBUG) {
    console.log(`Tab id changed from ${removedTabId} to ${addedTabId}. Reloading content_script_loader.js`);
  }
  browser.tabs.executeScript(addedTabId, {
    file: '/content_script_loader.js',
    allFrames: true,
    runAt: 'document_start',
    matchAboutBlank: true
  });
}
chrome.tabs.onReplaced.addListener(reloadClientLoaders);
