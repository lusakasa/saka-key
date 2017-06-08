import { h } from 'preact';
import { Provider } from 'preact-redux';
import store from './store';
import StandardLayout from 'pages/layout/StandardLayout';
import Drawer from './Drawer';
import Content from './Content';
import './style.css';

export default () => (
  <Provider store={store}>
    <StandardLayout view='Options'>
      <Drawer />
      <Content />
    </StandardLayout>
  </Provider>
);
