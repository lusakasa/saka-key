import { applyMiddleware, createStore, combineReducers } from 'redux';
import update from 'immutability-helper';
import logger from 'redux-logger';

const testProfileGroups = [
  {
    name: 'standard',
    settings: {
      Basic: 'standard',
      Command: 'standard',
      Hints: 'standard',
      Developer: 'standard'
    }
  },
  {
    name: 'left hand',
    settings: {
      Basic: 'standard',
      Command: 'left hand',
      Hints: 'left hand',
      Developer: 'standard'
    }
  }
];
const testActiveProfileGroup = 'left hand';

const testSelectedProfileForMode = {
  Basic: 'standard',
  Command: 'left hand',
  Hints: 'standard',
  Developer: 'standard'
};

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
    case 'LOAD_MODES_CONFIG':
      return action.modes;
    default:
      return state;
  }
};

const settings = (state = null, action) => {
  switch (action.type) {
    case 'LOAD_SETTINGS':
      return action.settings;
    case 'CHANGE_SETTING':
      const profiles = state[action.mode];
      const selected = profiles.findIndex((profile) => profile.name === action.profile);
      const newProfile = update(profiles[selected], { settings: { $merge: { [action.key]: action.value } } });
      return update(state, { [action.mode]: { $splice: [[selected, 1, newProfile]] } });
    default:
      return state;
  }
};

const profileGroups = (state = testProfileGroups, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const activeProfileGroup = (state = testActiveProfileGroup, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PROFILE_GROUP':
      return action.newActiveProfileGroup;
    default:
      return state;
  }
};

const selectedProfileForMode = (state = testSelectedProfileForMode, action) => {
  switch (action.type) {
    case 'CHANGE_PROFILE_FOR_MODE':
      return Object.assign({}, state, { [action.mode]: action.newProfileName });
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  view,
  modes,
  settings,
  profileGroups,
  activeProfileGroup,
  selectedProfileForMode
});

export const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);
