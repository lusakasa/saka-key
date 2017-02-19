import { Component, h } from 'preact';
import OptionsMenuHeader from './OptionsMenuHeader';
import CommandMenu from './CommandMenu';

export default class OptionsMenu extends Component {
  render () {
    return (
      <div>
        <OptionsMenuHeader />
        <CommandMenu />
      </div>
    );
  }
}
