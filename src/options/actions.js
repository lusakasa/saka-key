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
export const loadModes = (modes) => ({
  type: 'LOAD_MODES',
  modes
});

/** Load the modes settings (the values) */
export const loadSettings = (settings) => ({
  type: 'LOAD_SETTINGS',
  settings
});

export const loadProfileGroups = (profileGroups) => ({
  type: 'LOAD_PROFILE_GROUPS',
  profileGroups
});

export const loadActiveProfileGroup = (activeProfileGroup) => ({
  type: 'LOAD_ACTIVE_PROFILE_GROUP',
  activeProfileGroup
});

export const loadSelectedProfileForMode = (selectedProfileForMode) => ({
  type: 'LOAD_SELECTED_PROFILE_FOR_MODE',
  selectedProfileForMode
});

/**
 * Updates the value for the specified setting in chrome.storage.local
 * Doesn't actually change state (there is no corresponding reducer)
 * The storage change listener issues the action that changes state
 * ...feel guilty about this design
 */
export const setSetting = (mode, profile, key, value) => {
  browser.storage.local.get('settings').then(({ settings }) => {
    settings[mode].find((p) => p.name === profile).settings[key] = value;
    browser.storage.local.set({ 'settings': settings }).then(() => {
      // msg(1, 'settingsChange', { mode, profile });
    });
  });
  return {
    type: 'SET_SETTING',
    mode,
    profile,
    key,
    value
  };
};

export const setSelectedProfileForMode = (mode, newProfileName) => {
  return {
    type: 'SET_SELECTED_PROFILE_FOR_MODE',
    mode,
    newProfileName
  };
};

export const addProfile = (modeName, newProfileName) => {
  browser.storage.local.get(['settings'])
    .then(({ settings }) => {
      const standardSettings = settings[modeName].find((p) => p.name === 'standard').settings;
      settings[modeName].push({
        name: newProfileName,
        settings: standardSettings
      });
      browser.storage.local.set({ settings });
    });
  return {
    type: 'ADD_PROFILE',
    mode: modeName,
    profileName: newProfileName
  };
};

export const deleteProfile = (modeName, profileName) => {
  browser.storage.local.get(['settings'])
    .then(({ settings }) => {
      settings[modeName] = settings[modeName].filter(({ name }) => name !== profileName);
      browser.storage.local.set({ settings });
    });
  return {
    type: 'DELETE_PROFILE',
    mode: modeName,
    profile: profileName
  };
};

export const duplicateProfile = (modeName, profileName) => {
  const copyName = `${profileName} copy`;
  browser.storage.local.get(['settings'])
    .then(({ settings }) => {
      settings[modeName].push({
        name: copyName,
        settings: settings[modeName].find((profile) => profile.name === profileName).settings
      });
      browser.storage.local.set({ settings });
    });
  return {
    type: 'DUPLICATE_PROFILE',
    mode: modeName,
    profileName: copyName
  };
};

export const renameProfile = (modeName, oldProfileName, newProfileName) => {
  browser.storage.local.get(['settings'])
    .then(({ settings }) => {
      settings[modeName] = settings[modeName].map((profile) => {
        if (profile.name === oldProfileName) {
          return {
            name: newProfileName,
            settings: profile.settings
          };
        }
        return profile;
      });
      browser.storage.local.set({ settings });
    });
  return {
    type: 'RENAME_PROFILE',
    mode: modeName,
    oldProfileName,
    newProfileName
  };
};


/** Change the active profile group */
export const setActiveProfileGroup = (newActiveProfileGroup) => {
  browser.storage.local.set({ 'activeProfileGroup': newActiveProfileGroup });
  return {
    type: 'SET_ACTIVE_PROFILE_GROUP',
    newActiveProfileGroup
  };
};

export const addProfileGroup = (newProfileGroupName) => {
  browser.storage.local.get(['profileGroups', 'activeProfileGroup'])
    .then(({ profileGroups, activeProfileGroup }) => {
      profileGroups.push({
        name: newProfileGroupName,
        settings: profileGroups.find((p) => p.name === 'standard').settings
      });
      browser.storage.local.set({ profileGroups, activeProfileGroup: newProfileGroupName });
    });
  return {
    type: 'ADD_PROFILE_GROUP',
    newProfileGroupName
  };
};

export const deleteProfileGroup = (profileGroupName) => {
  browser.storage.local.get('profileGroups')
    .then(({ profileGroups }) => {
      profileGroups = profileGroups.filter(({ name }) => name !== profileGroupName);
      browser.storage.local.set({ profileGroups, activeProfileGroup: 'standard' });
    });
  return {
    type: 'DELETE_PROFILE_GROUP',
    profileGroupName
  };
};

export const duplicateProfileGroup = (profileGroupName) => {
  const newProfileGroupName = `${profileGroupName} copy`;
  browser.storage.local.get(['profileGroups'])
    .then(({ profileGroups }) => {
      profileGroups.push({
        name: newProfileGroupName,
        settings: profileGroups.find((p) => p.name === profileGroupName).settings
      });
      browser.storage.local.set({ profileGroups, activeProfileGroup: newProfileGroupName });
    });
  return {
    type: 'DUPLICATE_PROFILE_GROUP',
    duplicatedProfileGroup: profileGroupName
  };
};

export const renameProfileGroup = (oldProfileGroupName, newProfileGroupName) => {
  browser.storage.local.get('profileGroups')
    .then(({ profileGroups }) => {
      profileGroups = profileGroups.map((profileGroup) => {
        if (profileGroup.name === oldProfileGroupName) {
          return {
            name: newProfileGroupName,
            settings: profileGroup.settings
          };
        }
        return profileGroup;
      });
      browser.storage.local.set({ profileGroups, activeProfileGroup: newProfileGroupName });
    });
  return {
    type: 'RENAME_PROFILE_GROUP',
    oldProfileGroupName,
    newProfileGroupName
  };
};


/** Change the profile for the given mode of the active profileGroup */
export const setProfileGroupOption = (activeProfileGroupName, mode, profileName) => {
  browser.storage.local.get('profileGroups').then(({ profileGroups }) => {
    profileGroups.find((p) => p.name === activeProfileGroupName).settings[mode] = profileName;
    browser.storage.local.set({ 'profileGroups': profileGroups }).then(() => {
      console.log('change profile group option', activeProfileGroupName, mode, profileName);
    });
  });
  return {
    type: 'SET_PROFILE_GROUP_OPTION',
    activeProfileGroupName,
    mode,
    profileName
  };
};
