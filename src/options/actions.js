export const initConfig = (config) => ({
  type: 'INIT_CONFIG',
  config
});

export const setView = (view) => ({
  type: 'SET_VIEW',
  view
});

export const viewProfile = (profile) => ({
  type: 'VIEW_PROFILE',
  profile
});
