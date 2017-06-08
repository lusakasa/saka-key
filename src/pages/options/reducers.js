import { combineReducers } from 'redux';
import store from './store';
// import update from 'immutability-helper';

// V1 - how it works now
// modes: Array<{ modeName, modeDescription, Array<{ type, key, label, {...other} }>>
// settings: { [modeName]: Array<{ profileName, settings: { [key]: values } }>
// profileGroups: Array<{ profileGroupName, settings: { [modeName]: profileName }
// activeProfileGroup: string
// selectedProfileForMode: { [modeName]: profileName } ** NOT PERSISTED LIKE THE OTHERS, lives only as long as options GUI
//
// -> background page listens for changes and converts to storage format designed for loading into clients
// (not yet implemented)
//
// client_profile: { [modeName]: profile_Id <- generated with UUID}
//    dependent on: 1. activeProfileGroup, 2. profileGroups
// { ...profile_Id: modeSpecificSettingsObject
//    dependent on: settings
//
// temp fix for now: fetch settings from background page


// modes: Array<{ modeName, modeDescription, Array<{ type, key, label, {...other} }>>
// settings: { [modeName]: Array<{ profileName, settings: { [key]: values }, ERRORS: { [key]: ERROR} }>
// profileGroups: Array<{ profileGroupName, settings: { [modeName]: profileName }
// activeProfileGroup: string
//
//


// ---------------------------------------- future idea
// V2 - how it will work in the future
// modes: [modeName]    modeNames must be unique and thus serve as Ids
// ...modeName: { modeName, modeDescription, profiles: [profileId], [{ type, key, label, {...other} }] }
// ...profileId: { profileId, modeId, profileName, options: { [key]: value } } (one key per profile)
// profileGroups: [profileGroupId]
// ...profileGroupId: { profileGroupId, profileGroupName, settings: { [modeId]: profileId} }
// activeProfileGroup: profileGroupId
// selectedProfileForMode: { [modeId]: profileId } ** NOT PERSISTED LIKE THE OTHERS
//
// -> background page listens for changes and converts to storage format designed for loading into clients
//
// client_profile: { [modeName]: client_profileId}
//    dependent on: 1. activeProfileGroup, 2. profileGroups
// { ...client_profileId: modeSpecificSettingsObject
//    dependent on: settings


// V consider in the future
/*
Consider the following normalized storage format:

modesList: ["1", "2", "3", "4"],
"modes": {
  "1": {
    "id": 1
    "name": "Basic",
    "description": "Just the basics",
    "profiles": ["1", "2"]
    "options": [
      {
        "type": "checkbox",
        "label": "Saka Key enabled",
        "key": "enabled"
      }
    ]
  },
  "2": {
    "id": 2,
    "name": "Command",
    "description": "Just Commands",
    "profiles": ["3", "4"]
    "options": [ ... ]
  }
},
"profiles": {
  "1": {
    "id": "1"
    "mode": "1",
    "name": "default",
    "options": { "key": "value" }
  },
  "2": {
    "id": "2",
    "mode": "1",
    "name": "left hand",
    "options": { "key": "value" }
  }
},
"profileGroupsList": ["1", "2"]
"profileGroups": {
  "1": {
    "id": "1",
    "name": "default",
    "map": {
      "1": "1",
      "2": "3"
    }
  }
},
"activeProfileGroup": "1",
// NOT STORED
"selectedModeProfile": {
  "1": "1",
  "2": "2"
}
*/

// let defaultView;
// export function setDefaultView (tmp) {
//   defaultView = tmp;
// }

const view = (state = 'Info', action) => {
  switch (action.type) {
    case 'SET_VIEW':
      return action.view;
    default:
      return state;
  }
};

const modes = (state = null, action) => {
  switch (action.type) {
    case 'LOAD_MODES':
      return action.modes;
    default:
      return state;
  }
};

const settings = (state = null, action) => {
  switch (action.type) {
    case 'LOAD_SETTINGS':
      return action.settings;
    default:
      return state;
  }
};

const profileGroups = (state = null, action) => {
  switch (action.type) {
    case 'LOAD_PROFILE_GROUPS':
      return action.profileGroups;
    default:
      return state;
  }
};

const activeProfileGroup = (state = null, action) => {
  switch (action.type) {
    case 'LOAD_ACTIVE_PROFILE_GROUP':
      return action.activeProfileGroup;
    default:
      return state;
  }
};

const selectedProfileForMode = (state = null, action) => {
  switch (action.type) {
    // Set selected modes to those of new Active Profile
    // TODO: fix this so it doesn't rely on store.getState(), possibly with thunks
    case 'SET_PROFILE_GROUP_OPTION':
      const oldProfileMap = store.getState().profileGroups.find((p) => p.name === action.activeProfileGroupName).settings;
      return Object.assign({}, oldProfileMap, { [action.mode]: action.profileName });
    case 'LOAD_ACTIVE_PROFILE_GROUP':
      return store.getState().profileGroups.find((p) => p.name === action.activeProfileGroup).settings;
    case 'SET_SELECTED_PROFILE_FOR_MODE':
      return Object.assign({}, state, { [action.mode]: action.newProfileName });
    case 'DELETE_PROFILE':
      return Object.assign({}, state, { [action.mode]: 'default' });
    case 'ADD_PROFILE':
      return Object.assign({}, state, { [action.mode]: action.profileName });
    case 'RENAME_PROFILE':
      return Object.assign({}, state, { [action.mode]: action.newProfileName });
    case 'DUPLICATE_PROFILE':
      return Object.assign({}, state, { [action.mode]: action.profileName });
    default:
      return state;
  }
};

export default combineReducers({
  view,
  modes,
  settings,
  profileGroups,
  activeProfileGroup,
  selectedProfileForMode
});
