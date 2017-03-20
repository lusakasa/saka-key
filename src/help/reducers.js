import { createStore } from 'redux';
const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_CONFIG':
      return Object.assign({}, state, { ...action.config, loaded: true });
    default:
      return state;
  }
};

export const store = createStore(rootReducer);
