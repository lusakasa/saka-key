import 'lib/browser_polyfill';
import { applyMiddleware, createStore } from 'redux';
import { initialize as initClient } from 'client';
import { msg } from 'mosi/client';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { initialize } from './actions';
import { storageGet, storageSet } from 'storage/storage';
import { getAttributes } from 'lib/util.js';

async function initializeOptionsPage () {
  const state = await storageGet(null);
  const optionsPageEntries = getAttributes(state, ['categories', 'config', 'options', 'builtInProfiles', 'customProfiles', 'activeProfiles', 'options']);
  store.dispatch(initialize(optionsPageEntries));
}

initializeOptionsPage();

initClient('options_page', {
  SYNC_ACTION: (action) => store.dispatch(action),
  RERENDER: initializeOptionsPage
});

const synchronizeOptionsGUIs = (store) => (next) => (action) => {
  if (!action.syncAction && action.type !== 'INITIALIZE') {
    msg('options_page&other', 'SYNC_ACTION', { ...action, syncAction: true });
  }
  return next(action);
};

const writeToStorage = (store) => (next) => (action) => {
  const nextState = next(action);
  if (!action.syncAction && action.type !== 'INITIALIZE') {
    storageSet(store.getState());
  }
  return nextState;
};

const store = createStore(
  rootReducer,
  applyMiddleware(synchronizeOptionsGUIs, writeToStorage, thunk, ...(SAKA_DEBUG ? [logger] : []))
);
export default store;

// // Whenever chrome.storage.local changes, update the GUI
// // Action creators don't actually modify state (because no reducers listen for those action types)
// // They are called only for their side effects (which write to chrome.storage.local)
// // Instead, state is modified when a change is noticed in chrome.storage.local
// browser.storage.onChanged.addListener((changes, area) => {
//   if (area === 'local') {
//     if (changes.hasOwnProperty('modes')) {
//       store.dispatch(loadModes(changes.modes.newValue));
//     }
//     if (changes.hasOwnProperty('settings')) {
//       store.dispatch(loadSettings(changes.settings.newValue));
//     }
//     if (changes.hasOwnProperty('profileGroups')) {
//       store.dispatch(loadProfileGroups(changes.profileGroups.newValue));
//     }
//   }
// });
