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
