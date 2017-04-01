import { combineReducers } from 'redux';
import store from './store';
// import update from 'immutability-helper';


// modes: Array<{ modeName, modeDescription, Array<{ type, key, label, {...other} }>>
// settings: { [modeName]: Array<{ profileName, settings: { [key]: values } }>
// profileGroups: Array<{ profileGroupName, settings: { [modeName]: profileName }
// activeProfileGroup: string
// selectedProfileForMode: { [modeName]: profileName } ** NOT PERSISTED LIKE THE OTHERS

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
    "name": "standard",
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
    "name": "standard",
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
