import { Component, h } from 'preact';
import OptionsMenuHeader from './OptionsMenuHeader';
import CommandMenu from './CommandMenu';

import './Options.css';

export default class OptionsMenu extends Component {
  render () {
    return (
      <div className={'options-menu'}>
        <OptionsMenuHeader />
        <CommandMenu />
      </div>
    );
  }
}
