import { combineReducers } from 'redux';
import store from './store';
// import update from 'immutability-helper';


// modes: Array<{ modeName, modeDescription, Array<{ type, key, label, {...other} }>>
// settings: { [modeName]: Array<{ profileName, settings: { [key]: values } }>
// profileGroups: Array<{ profileGroupName, settings: { [modeName]: profileName }
// activeProfileGroup: string
// selectedProfileForMode: { [modeName]: profileName } ** NOT PERSISTED LIKE THE OTHERS

const view = (state = 'Settings', action) => {
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
    // case 'SET_SETTING':
    //   const profiles = state[action.mode];
    //   const selected = profiles.findIndex((profile) => profile.name === action.profile);
    //   const newProfile = update(profiles[selected], { settings: { $merge: { [action.key]: action.value } } });
    //   return update(state, { [action.mode]: { $splice: [[selected, 1, newProfile]] } });
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
    // case 'SET_ACTIVE_PROFILE_GROUP':
    //   return action.newActiveProfileGroup;
    case 'LOAD_ACTIVE_PROFILE_GROUP':
      return action.activeProfileGroup;
    default:
      return state;
  }
};

const selectedProfileForMode = (state = null, action) => {
  switch (action.type) {
    case 'LOAD_ACTIVE_PROFILE_GROUP':
      // TODO: fix this so it doesn't rely on store.getState(), possibly with thunks
      return store.getState().profileGroups.find((p) => p.name === action.activeProfileGroup).settings;
    case 'SET_SELECTED_PROFILE_FOR_MODE':
      return Object.assign({}, state, { [action.mode]: action.newProfileName });
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
