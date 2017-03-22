import { createStore } from 'redux';

const rootReducer = (state = { view: 'Settings', profile: 'Standard', modes: [] }, action) => {
  switch (action.type) {
    case 'SET_VIEW':
      return Object.assign({}, state, { view: action.view });
    case 'VIEW_PROFILE':
      return Object.assign({}, state, { profile: action.profile });
    case 'LOAD_MODES_SETTINGS':
      console.log('lms', action.modes);
      return Object.assign({}, state, { modes: action.modes });
    default:
      return state;
  }
};

export const store = createStore(
  rootReducer
  );
