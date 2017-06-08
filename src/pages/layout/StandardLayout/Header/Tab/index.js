import { h } from 'preact';
import './style.css';

export default ({ children, name, view }) => (
  <a
    className={`mdc-typography--subheading2 saka-toolbar-item ${
      view === name ? 'saka-toolbar-item__active' : ''}`}
  >
    { children }
  </a>
);
