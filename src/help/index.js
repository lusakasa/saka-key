import { render, h } from 'preact';
import { Provider } from 'preact-redux';
import { store } from './reducers';
import HelpMenu from './components/HelpMenu';
import { initialize } from 'client';

initialize('help');

render((
  <Provider store={store}>
    <HelpMenu />
  </Provider>
), document.body);
