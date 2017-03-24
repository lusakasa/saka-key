import { render, h } from 'preact';
import { Provider } from 'preact-redux';
import { store } from 'options/reducers';
import OptionsMenu from './OptionsMenu';
import { initialize } from 'client';

// TODO: at some point remove this polyfill or if an npm package is released
// use it, instead of a random github repo
if (SAKA_PLATFORM === 'chrome') {
  require('webextension-polyfill/dist/browser-polyfill');
}

initialize('options');

render((
  <Provider store={store}>
    <OptionsMenu />
  </Provider>
), document.body);
