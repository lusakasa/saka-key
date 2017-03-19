import { render, h } from 'preact';
import { Provider } from 'preact-redux';
import { store } from './reducers';
import OptionsMenu from './components/OptionsMenu';
import { initialize } from 'client';

initialize('options');

render((
  <Provider store={store}>
    <OptionsMenu />
  </Provider>
), document.body);
