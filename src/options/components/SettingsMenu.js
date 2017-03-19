import { Component, h } from 'preact';
import SettingsHeader from './SettingsHeader';
import SettingsDrawer from './SettingsDrawer';
import CommandMenu from './CommandMenu';

export default class SettingsMenu extends Component {
  render () {
    return (
      <div className={'settings-menu'}>
        <SettingsHeader />
        <SettingsDrawer />
        <main>
          <CommandMenu />
        </main>
      </div>
    );
  }
}
