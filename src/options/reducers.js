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
      return Object.assign({}, state, { settings: action.settings });
    default:
      return state;
  }
};

export const store = createStore(
  rootReducer
  );
