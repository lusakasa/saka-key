import { createStore } from 'redux';



const rootReducer = (state = { view: 'settings' }, action) => {
  switch (action.type) {
    case 'SET_VIEW':
      return Object.assign({}, state, { view: action.view });
    default:
      return state;
  }
};

export const store = createStore(rootReducer);
