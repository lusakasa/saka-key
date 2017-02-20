// must import h or build will break for some reason
import { render, h } from 'preact';
import { Provider } from 'preact-redux';
import { store } from './reducers';
import OptionsMenu from './components/OptionsMenu';

render((
  <Provider store={store}>
    <OptionsMenu />
  </Provider>
), document.body);
