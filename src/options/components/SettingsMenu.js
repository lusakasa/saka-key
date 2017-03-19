import { Component, h } from 'preact';
import CommandMenu from './CommandMenu';

export default class SettingsMenu extends Component {
  render () {
    return (
      <div className={'settings-menu'}>
        <header class='mdc-toolbar'>
          <section class='mdc-toolbar__section mdc-toolbar__section--align-start'>
            <span class='mdc-toolbar__title'>Profile 1 (default)</span>
            <span class='mdc-toolbar__title'>Profile 2</span>
            <span class='mdc-toolbar__title'>Vimium</span>
          </section>
        </header>
        <main>
          <CommandMenu />
        </main>
      </div>
    );
  }
}
