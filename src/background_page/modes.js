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

/**
 * generates client settings and sends them to every client
 */
export async function regenerateClientSettings () {
  cachedClientSettings = await generateClientSettings();
  if (SAKA_DEBUG) console.log('New clientSettings generated: ', cachedClientSettings);
  msg('client', 'clientSettings', cachedClientSettings);
}

/** Called when the user changes a setting on the options page */
export function storageChange () {
  regenerateClientSettings();
}

/**
 * generateClientSettings is called when the chrome.storage.onChange event fires.
 * It has two jobs:
 *
 * 1. Use the new user-defined settings to generate and cache the client settings that
 *    should be sent to every client
 * 2. Write any errors detected in the new user-defined settings to storage so the options
 *    GUI can update to show them.
 *
 * It accomplishes this by passing the user-defined settings to every mode's clientSettings
 * method. clientSettings must returns an object with two properties:
 *
 * * values: an object whose properties should be passed to every Saka client.
 * * errors: an object whose properties are written to storage to indicate invalid user-
 *   defined settings.
 */
async function generateClientSettings () {
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
  // 1. Construct map containing key-value mappings for ALL modes
  const settingsMap = Object.entries(profileMap).reduce((allSettings, [mode, profile]) => {
    const activeProfile = settings[mode].find(({ name }) => name === profileMap[mode]);
    const modeSettings = activeProfile.settings;
    return Object.assign(allSettings, modeSettings);
  }, {});
  // 2. Generate client settings and validate settings
  Object.entries(profileMap).forEach(([mode, profile]) => {
    const options = modesConfig.find(({ name }) => name === mode).options;
    const activeProfile = settings[mode].find(({ name }) => name === profileMap[mode]);
    const { values, errors } = modes[mode].clientSettings(options, settingsMap) || {
      values: {}, errors: {}
    };
    activeProfile.errors = errors;
    Object.assign(clientSettings, values);
  });
  await browser.storage.local.set({ settings });
  return clientSettings;
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

// TODO: remove. Previously used this to detect page changes.
// No longer needed, but might be useful in the future
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log('tabUpdate:', changeInfo);
//   if (changeInfo.status) {
//     console.log('sending status change');
//     msg(`tab[${tabId}]&topFrame`, 'modeMessage', {
//       mode: 'Command',
//       action: 'recalculateCurrentScrollElement',
//       arg: changeInfo[status]
//     });
//   }
// });
