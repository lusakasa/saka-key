import { msg } from 'mosi/core';
export let modes = {};

export function setModes (availableModes) {
  modes = availableModes;
}

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


export let cachedClientSettings;

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
    const clientSettingsPerMode = {};
    const clientSettings = {};
    Object.entries(profileMap).forEach(([mode, profile]) => {
      const options = modesConfig.find(({ name }) => name === mode).options;
      const modeSettings = settings[mode].find(({ name }) => name === profileMap[mode]).settings;
      const clientModeSettings = modes[mode].clientSettings(options, modeSettings);
      clientSettingsPerMode[mode] = clientModeSettings;
      Object.assign(clientSettings, clientModeSettings);
    });
    return clientSettings;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

