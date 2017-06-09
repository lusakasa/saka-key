import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {
  loadModes,
  loadSettings,
  loadProfileGroups,
  loadActiveProfileGroup
  // loadSelectedProfileForMode
} from 'pages/options/actions';

const middleWare = SAKA_DEBUG
 ? applyMiddleware(thunk, logger)
 : applyMiddleware(thunk);

const store = createStore(
  rootReducer,
  middleWare
);
export default store;

// TODO: cleanup, timeout is dirty fix to ensure browser polyfill is loaded
setTimeout(() => {
  // Load initial state from chrome.storage.local
  browser.storage.local.get(['modes', 'settings', 'profileGroups', 'activeProfileGroup'])
    .then(({ modes, settings, profileGroups, activeProfileGroup, selectedProfileForMode }) => {
      store.dispatch(loadModes(modes));
      store.dispatch(loadSettings(settings));
      store.dispatch(loadProfileGroups(profileGroups));
      store.dispatch(loadActiveProfileGroup(activeProfileGroup));
    });
  // Whenever chrome.storage.local changes, update the GUI
  // Action creators don't actually modify state (because no reducers listen for those action types)
  // They are called only for their side effects (which write to chrome.storage.local)
  // Instead, state is modified when a change is noticed in chrome.storage.local
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local') {
      if (changes.hasOwnProperty('modes')) {
        store.dispatch(loadModes(changes.modes.newValue));
      }
      if (changes.hasOwnProperty('settings')) {
        store.dispatch(loadSettings(changes.settings.newValue));
      }
      if (changes.hasOwnProperty('profileGroups')) {
        store.dispatch(loadProfileGroups(changes.profileGroups.newValue));
      }
      if (changes.hasOwnProperty('activeProfileGroup')) {
        store.dispatch(loadActiveProfileGroup(changes.activeProfileGroup.newValue));
      }
    }
  });
}, 0);
