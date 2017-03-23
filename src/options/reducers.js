import { createStore } from 'redux';

const defaultState = {
  view: 'Settings',
  profile: 'Standard',
  modes: [],
  settings: {}
};

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_VIEW':
      return Object.assign({}, state, { view: action.view });
    case 'VIEW_PROFILE':
      return Object.assign({}, state, { profile: action.profile });
    case 'LOAD_MODES_CONFIG':
      return Object.assign({}, state, { modes: action.modes });
    case 'LOAD_SETTINGS':
      console.log('startState', action.settings);
      return Object.assign({}, state, { settings: action.settings });
    case 'CHANGE_SETTING':
      // TODO: Merging like this is bad practice and the data should be normalized
      const copy = Object.assign({}, state);
      copy.settings = Object.assign({}, state.settings);
      copy.settings[action.mode] = Object.assign({}, state.settings[action.mode]);
      copy.settings[action.mode][action.profile] = Object.assign({}, state.settings[action.mode][action.profile], {
        [action.key]: action.value
      });
      console.log('copy', copy);
      return copy;
    default:
      return state;
  }
};

export const store = createStore(
  rootReducer
  );
