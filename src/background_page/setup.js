import { modes, regenerateClientSettings } from './modes';

/**
 * Sets up startup listener, sets up install listener, and executes setup routine
 * When an extension is installed, only the install listener is executed, not the
 * startup listener. The startup listener is called only when chrome is opened.
 * The install listener can be called for a number of reasons.
 * A setup action that should always run whenever the background page starts
 * should NOT be placed in the startup listener.
 */
export function setup () {
  initInstallListeners();
  regenerateClientSettings();
  initStorageChangeListener();
}

function initInstallListeners () {
  chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    if (SAKA_DEBUG) console.log('install event: ' + reason);
    switch (reason) {
      case 'install':
        await initializeLocalStorage(modes);
        break;
      case 'update':
        await initializeLocalStorage(modes);
        break;
      case 'chrome_update':
      case 'shared_module_update':
      default:
        break;
    }
    Object.values(modes).forEach((mode) => {
      mode.onInstalled(reason);
    });
  });
}

function initStorageChangeListener () {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    console.log(changes);
    if (areaName === 'local') {
      Object.entries(changes).forEach(([key, { oldValue, newValue }]) => {
        if (SAKA_DEBUG) console.log(`storage listener detected ${key} changed from `, oldValue, ' to ', newValue);
        switch (key) {
          case 'settings':
          case 'modes':
          case 'profileGroups':
          case 'activeProfileGroup':
            console.log('regenerating client settings');
            regenerateClientSettings();
            break;
          default:
        }
      });
    } else {
      throw Error('how did that happen?');
    }
  });
}

export async function settingsChange ({ mode, profile }, src) {
  if (SAKA_DEBUG) {
    if (!modes[mode]) {
      throw Error(`Missing Mode ${mode}`);
    }
  }
  const { settings } = await browser.storage.local.get('settings');
  if (SAKA_DEBUG) {
    console.log(`New settings for ${mode}[${profile}]`, settings[mode][profile]);
  }
  await modes[mode].onSettingsChange(profile, settings[mode][profile]);
}

async function initializeLocalStorage (modes) {
  await setupDefaultModes(modes);
  await setupDefaultSettings(modes);
  await setupDefaultProfiles();
}

async function setupDefaultModes (modes) {
  const startModes = Object.keys(modes).map((name) =>
    `/config_${name.toLowerCase()}.json`
  );
  try {
    const modesFetch = await Promise.all(startModes.map((path) => fetch(path)));
    const modes = await Promise.all(modesFetch.map((fetch) => fetch.json()));
    await browser.storage.local.set({'modes': modes});
  } catch (error) {
    console.error(error);
  }
}

async function setupDefaultProfiles () {
  try {
    const settings = (await (await fetch('/startProfiles.json')).json());
    await browser.storage.local.set({ 'profileGroups': settings.profileGroups });
    await browser.storage.local.set({ 'activeProfileGroup': settings.activeProfileGroup });
  } catch (error) {
    console.error(error);
  }
}

// TODO: upgrade this once profiles are added
async function setupDefaultSettings (modes) {
  const defaultSettingsFilePaths = Object.keys(modes).map((name) =>
    `/default_${name.toLowerCase()}.json`
  );
  try {
    const defaultSettingsFetch = await Promise.all(defaultSettingsFilePaths.map((path) => fetch(path)));
    const defaultSettings = await Promise.all(defaultSettingsFetch.map((fetch) => fetch.json()));
    const defaultSettingsObject = {};
    defaultSettings.forEach((defaultSetting) => {
      defaultSettingsObject[defaultSetting.name] = defaultSetting.profiles;
    });
    await browser.storage.local.set({ 'settings': defaultSettingsObject });
  } catch (error) {
    console.error(error);
  }
}
