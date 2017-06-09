import { h } from 'preact';
import Tab from './Tab';
import './style.css';

export default ({ view }) => (
  <header className='mdc-toolbar mdc-toolbar--fixed saka-toolbar options-menu-header'>
    <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
      <a href='info.html'><img src='logo.png' className='saka-logo' alt='Saka Key' /></a>
      <a href='info.html' className='mdc-toolbar__title saka-logo-text'>Saka Key</a>
    </section>
    <section className='mdc-toolbar__section mdc-toolbar__section--align-end'>
      <Tab href='options.html' view={view} name='Options' />
      <Tab href='extensions.html' view={view} name='Extensions' />
      <Tab href='http://saka-key.lusakasa.com' view={view} name='Tutorial' target='_blank' />
    </section>
  </header>
);
