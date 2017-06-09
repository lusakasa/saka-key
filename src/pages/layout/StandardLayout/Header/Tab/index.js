import { h } from 'preact';
import './style.css';

export default ({ href, name, view, target }) => (
  <a
    href={href}
    target={target}
    className={`mdc-typography--subheading2 saka-toolbar-item ${
      view === name ? 'saka-toolbar-item__active' : ''}`}
  >
    { name }
  </a>
);
