import { h } from 'preact';
import OptionsMenuTab from './OptionsMenuTab';

const OptionsMenuHeader = ({ view }) => (
  <header className='mdc-toolbar mdc-toolbar--fixed saka-toolbar options-menu-header'>
    <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
      <img src='logo.png' className='saka-logo' alt='Saka Key' />
      <span className='mdc-toolbar__title'>Saka Key</span>
    </section>
    <section className='mdc-toolbar__section mdc-toolbar__section--align-end'>
      <a
        className={'mdc-typography--subheading2 saka-toolbar-item'}
        target='_blank'
        href='http://saka-key.lusakasa.com/'
      >
        Tutorial
      </a>
      <OptionsMenuTab view={view} name='Settings' />
      <OptionsMenuTab view={view} name='Extensions' />
      <OptionsMenuTab view={view} name='About' />
    </section>
  </header>
);

export default OptionsMenuHeader;
