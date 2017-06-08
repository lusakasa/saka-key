import 'lib/browser_polyfill';
import { render, h } from 'preact';
import { Provider } from 'preact-redux';
// import setDefaultView from 'options/reducers';
import store from 'options/store';
import OptionsMenu from 'options/OptionsMenu';
import { initialize } from 'client';

initialize('popup');

// setDefaultView('Settings');
render((
  <Provider store={store}>
    <OptionsMenu />
  </Provider>
), document.body);
