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

/** Load the modes settings (what the settings are, not their values) */
export const loadModesSettings = (modesConfig) => ({
  type: 'LOAD_MODES_SETTINGS',
  modes: modesConfig
});
