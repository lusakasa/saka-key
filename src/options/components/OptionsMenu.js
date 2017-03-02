import { Component, h } from 'preact';
// import OptionsMenuHeader from './OptionsMenuHeader';
import CommandMenu from './CommandMenu';

import '@material/button/dist/mdc.button.css';
import '@material/list/dist/mdc.list.css';
import '@material/toolbar/dist/mdc.toolbar.css';
import 'options/style.css';

// TODO: change mdc-toolbar__fixed-adjust to mdc-toolbar-fixed-adjust
// when @material/toolbar package updates

export default class OptionsMenu extends Component {
  render () {
    return (
      <div className={'options-menu'}>
        <header class='mdc-toolbar mdc-toolbar--fixed'>
          <section class='mdc-toolbar__section mdc-toolbar__section--align-start'>
            <img src='logo.png' class='saka-logo'>Saka Key</img>
            <span class='mdc-toolbar__title'>Saka Key</span>
          </section>
        </header>
        <main className='mdc-toolbar__fixed-adjust'>
          <CommandMenu />
        </main>
      </div>
    );
  }
}
