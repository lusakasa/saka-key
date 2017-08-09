import store from './store';
import { combineReducers } from 'redux';

const categories = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.entries.categories;
    default:
      return state;
  }
};

const config = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.entries.config;
    default:
      return state;
  }
};

const builtInProfiles = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.entries.builtInProfiles;
    default:
      return state;
  }
};

const customProfiles = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.entries.customProfiles;
    case 'NEW_PROFILE':
    case 'DUPLICATE_PROFILE':
      const profiles = state[action.category];
      return { ...state, [action.category]: [...profiles, action.profile] };
    case 'DELETE_PROFILE': {
      const profiles = { ...state };
      profiles[action.category] = profiles[action.category]
        .filter((profile) => profile !== action.profile);
      return profiles;
    }
    case 'RENAME_PROFILE': {
      const profiles = { ...state };
      profiles[action.category] = profiles[action.category]
        .map((profile) => profile === action.oldName
          ? action.newName
          : profile
        );
      return profiles;
    }
    case 'SET_BUILTIN_OPTION': {
      const profiles = state[action.category];
      return { ...state, [action.category]: [...profiles, action.profile] };
    }
    default:
      return state;
  }
};

const activeProfiles = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.entries.activeProfiles;
    case 'SET_ACTIVE_PROFILE':
      return { ...state, [action.category]: action.profile };
    case 'NEW_PROFILE':
    case 'DUPLICATE_PROFILE':
      return { ...state, [action.category]: action.profile };
    case 'DELETE_PROFILE':
      return { ...state, [action.category]: 'default' };
    case 'RENAME_PROFILE':
      return { ...state, [action.category]: action.newName };
    case 'SET_BUILTIN_OPTION':
      return { ...state, [action.category]: action.profile };
    default:
      return state;
  }
};

const options = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.entries.options;
    case 'NEW_PROFILE':
      const defaultOptions = {};
      for (const option of store.getState().config[action.category]) {
        if (option.key) {
          defaultOptions[option.key] = option.default;
        }
      }
      return { ...state, [`${action.category}_${action.profile}`]: defaultOptions };
    case 'DUPLICATE_PROFILE':
      const options = { ...state[`${action.category}_${action.baseProfile}`] };
      return { ...state, [`${action.category}_${action.profile}`]: options };
    case 'DELETE_PROFILE': {
      const options = { ...state };
      delete options[`${action.category}_${action.profile}`];
      return options;
    }
    case 'SET_OPTION':
      const optionsKey = `${action.category}_${action.profile}`;
      const updatedOptions = { ...state[optionsKey], [action.key]: action.value };
      return { ...state, [optionsKey]: updatedOptions };
    case 'RENAME_PROFILE': {
      const options = { ...state };
      options[`${action.category}_${action.newName}`] = options[`${action.category}_${action.oldName}`];
      delete options[`${action.category}_${action.oldName}`];
      return options;
    }
    case 'SET_BUILTIN_OPTION': {
      const options = { ...state };
      options[`${action.category}_${action.profile}`] =
        { ...options[`${action.category}_${action.baseProfile}`], [action.key]: action.value };
      return options;
    }
    default:
      return state;
  }
};

export default combineReducers({
  categories,
  config,
  builtInProfiles,
  customProfiles,
  activeProfiles,
  options
  // don't store errors because errors are a function of config and options
});
