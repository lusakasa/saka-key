import { msg } from 'mosi/client';

/** Change the view, e.g. About/Settings/Tutorial etc. */
export const setView = (view) => ({
  type: 'SET_VIEW',
  view
});

/** Change the settings profile being viewed */
export const viewProfile = (profile) => ({
  type: 'VIEW_PROFILE',
  profile
});

/** Load the modes configuration (what the settings are, not their values) */
export const loadModesConfig = (modesConfig) => ({
  type: 'LOAD_MODES_CONFIG',
  modes: modesConfig
});

/** Load the modes settings (the actual values) */
export const loadSettings = (settings) => ({
  type: 'LOAD_SETTINGS',
  settings
});

/** Change a setting value */
export const changeSetting = (mode, profile, key, value) => {
  // TODO: rewrite this, handle async properly, don't assume it works
  browser.storage.local.get('settings').then(({ settings }) => {
    settings[mode][profile][key] = value;
    browser.storage.local.set({ 'settings': settings }).then(() => {
      msg(1, 'settingsChange', { mode, profile });
    });
  });
  return {
    type: 'CHANGE_SETTING',
    profile,
    mode,
    key,
    value
  };
};

/** Change the active profile group */
export const setActiveProfileGroup = (newActiveProfileGroup) => ({
  type: 'SET_ACTIVE_PROFILE_GROUP',
  newActiveProfileGroup
});
