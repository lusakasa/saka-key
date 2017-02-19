
import { createStore } from 'redux';
const rootReducer = (state = {}, action) => {
  console.log('bark');
  switch (action.type) {
    case 'INIT_CONFIG':
      console.log('meow');
      const x = Object.assign({}, state, { ...action.config, loaded: true});
      return x;
    default:
      return state;
  }
}

export const store = createStore(rootReducer);
