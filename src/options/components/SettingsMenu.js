import { Component, h } from 'preact';
import SettingsHeader from './SettingsHeader';
import SettingsDrawer from './SettingsDrawer';
import SettingsContent from './SettingsContent';

export default class SettingsMenu extends Component {
  render () {
    return (
      <div className={'settings-menu'}>
        <SettingsHeader />
        <SettingsDrawer />
        <SettingsContent />
      </div>
    );
  }
}
