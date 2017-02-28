import { Component, h } from 'preact';
// import OptionsMenuHeader from './OptionsMenuHeader';
import CommandMenu from './CommandMenu';

import '@material/button/dist/mdc.button.css';
import '@material/list/dist/mdc.list.css';
import '@material/toolbar/dist/mdc.toolbar.css';
import './Options.css';

export default class OptionsMenu extends Component {
  render () {
    return (
      <div className={'options-menu'}>
        <header class='mdc-toolbar'>
          <section class='mdc-toolbar__section mdc-toolbar__section--align-start'>
            <img src='logo.png' class='saka-logo'>Saka Key</img>
            <span class='mdc-toolbar__title'>Saka Key</span>
          </section>
        </header>
        <CommandMenu />
      </div>
    );
  }
}
