import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleWare = SAKA_DEBUG
 ? applyMiddleware(thunk, logger)
 : applyMiddleware(thunk);

export default createStore(
  rootReducer,
  middleWare
);
