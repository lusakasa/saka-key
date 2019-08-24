import { Component, h } from 'preact'
import CommandMenu from './CommandMenu'

import '@material/button/dist/mdc.button.css'
import '@material/list/dist/mdc.list.css'
import '@material/toolbar/dist/mdc.toolbar.css'
import '../style.css'

// TODO: change mdc-toolbar__fixed-adjust to mdc-toolbar-fixed-adjust
// when @material/toolbar package updates

export default class HelpMenu extends Component {
  render () {
    return (
      <div className={'help-menu'}>
        <header className='mdc-toolbar mdc-toolbar--fixed'>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
            <img src='logo.png' className='saka-logo'>
              Saka Key
            </img>
            <span className='mdc-toolbar__title'>Saka Key</span>
          </section>
        </header>
        <main className='mdc-toolbar-fixed-adjust'>
          <CommandMenu />
        </main>
      </div>
    )
  }
}
