import { createStore } from 'redux';
const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_CONFIG':
      const x = Object.assign({}, state, { ...action.config, loaded: true});
      return x;
    default:
      return state;
  }
}

export const store = createStore(rootReducer);
