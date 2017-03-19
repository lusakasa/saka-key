import { createStore } from 'redux';



const rootReducer = (state = { view: 'settings', profile: 'Standard' }, action) => {
  switch (action.type) {
    case 'SET_VIEW':
      return Object.assign({}, state, { view: action.view });
    case 'VIEW_PROFILE':
      return Object.assign({}, state, { profile: action.profile });
    default:
      return state;
  }
};

export const store = createStore(rootReducer);
