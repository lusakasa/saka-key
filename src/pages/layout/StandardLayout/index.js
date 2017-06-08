import { h } from 'preact';
import Header from './Header';
import Content from './Content';
import 'material-components-web/dist/material-components-web.min.css';
import './style.css';

export default ({ children, view }) => (
  <div className={'options-menu'}>
    <Header view={view} />
    <Content>
      { children }
    </Content>
  </div>
);
