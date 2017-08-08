/** Initialize the store from storage */
export const initialize = (entries) => ({
  type: 'INITIALIZE',
  entries
});

/** Set the active profile for the given category */
export const setActiveProfile = (category, profile) => ({
  type: 'SET_ACTIVE_PROFILE',
  category,
  profile
});

/** Create a new profile with default options */
export const newProfile = (category, profile) => ({
  type: 'NEW_PROFILE',
  category,
  profile
});

/** Duplicate an existing profile to create a new profile */
export const duplicateProfile = (category, profile, baseProfile) => ({
  type: 'DUPLICATE_PROFILE',
  category,
  profile,
  baseProfile
});

/** Delete a profile */
export const deleteProfile = (category, profile) => ({
  type: 'DELETE_PROFILE',
  category,
  profile
});

/** Rename a profile */
export const renameProfile = (category, oldName, newName) => ({
  type: 'RENAME_PROFILE',
  category,
  oldName,
  newName
});

/** Set the value of an option */
export const setOption = (category, profile, key, value) => ({
  type: 'SET_OPTION',
  category,
  profile,
  key,
  value
});
