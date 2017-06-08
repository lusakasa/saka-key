import { h } from 'preact';
import OptionsMenuTab from './OptionsMenuTab';
import './style.css';

export default ({ view }) => (
  <header className='mdc-toolbar mdc-toolbar--fixed saka-toolbar options-menu-header'>
    <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
      <a><img src='logo.png' className='saka-logo' alt='Saka Key' /></a>
      <a><span className='mdc-toolbar__title'>Saka Key</span></a>
    </section>
    <section className='mdc-toolbar__section mdc-toolbar__section--align-end'>
      <OptionsMenuTab view={view} name='Settings'>
        <div>
          Settings
        </div>
      </OptionsMenuTab>
      <OptionsMenuTab view={view} name='Extensions'>
        Extensions
      </OptionsMenuTab>
      <a
        className={'mdc-typography--subheading2 saka-toolbar-item'}
        target='_blank'
        href='http://saka-key.lusakasa.com/'
      >
        Tutorial
      </a>
    </section>
  </header>
);
