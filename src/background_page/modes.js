// import basicConfig from 'modes/basic/config.json';
// import commandConfig from 'modes/command/config.json';
// import hintsConfig from 'modes/hints/config.json';
// import developerConfig from 'modes/developer/config.json';

/** The available modes */
let modes = {};

export async function modeAction ({ mode, action, arg }, src) {
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

export function initModes (availableModes) {
  modes = availableModes;
  addListeners(modes);
}

/**
 * Initializes install and setup listeners
 * @param {*} modes
 */
function addListeners (modes) {
  chrome.runtime.onInstalled.addListener((details) => {
    Object.values(modes).forEach((mode) => {
      mode.onInstalled(details);
    });
    setupDefaultModes(modes);
    loadDefaultSettings(modes);
    loadDefaultProfiles();
  });
  chrome.runtime.onStartup.addListener(() => {
    Object.values(modes).forEach((mode) => {
      mode.onStartup();
    });
  });
  // TODO: Remove this when firefox fixes bug in next version
  if (SAKA_DEBUG && SAKA_PLATFORM === 'firefox') {
    Object.values(modes).forEach((mode) => {
      mode.onStartup();
    });
  }
}

function setupStorageChangeListener () {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      Object.entries(changes).forEach(({ oldValue, newValue }, key) => {
        if (key === 'settings') {
          
        } else {
          console.log(`key ${key} changed from ${oldValue || '-'} to ${newValue || '-'}`);
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

// async function setupDefaultConfig (modes) {
//   const configFilePaths = Object.keys(modes).map((name) =>
//     `/config/${name.toLowerCase()}.json`
//   );
//   const configFetch = await Promise.all(configFilePaths.map((path) => fetch(path)));
//   const config = await Promise.all(configFetch.map((fetch) => fetch.json()));
//   chrome.storage.local.set({'modesConfig': config}, () => {
//     if (chrome.runtime.lastError) {
//       console.error(chrome.runtime.lastError);
//       return;
//     }
//     if (SAKA_DEBUG) {
//       console.log('Modes modesConfig installed:', config);
//     }
//   });
// }

async function setupDefaultModes (modes) {
  const startModes = Object.keys(modes).map((name) =>
    `/config/${name.toLowerCase()}.json`
  );
  try {
    const modesFetch = await Promise.all(startModes.map((path) => fetch(path)));
    const modes = await Promise.all(modesFetch.map((fetch) => fetch.json()));
    await browser.storage.local.set({'modes': modes});
  } catch (error) {
    console.error(error);
  }
}

async function loadDefaultProfiles () {
  try {
    const settings = (await (await fetch('/startProfiles.json')).json());
    await browser.storage.local.set({ 'profileGroups': settings.profileGroups });
    await browser.storage.local.set({ 'activeProfileGroup': settings.activeProfileGroup });
  } catch (error) {
    console.error(error);
  }
}

// TODO: upgrade this once profiles are added
async function loadDefaultSettings (modes) {
  const defaultSettingsFilePaths = Object.keys(modes).map((name) =>
    `/default/${name.toLowerCase()}.json`
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
