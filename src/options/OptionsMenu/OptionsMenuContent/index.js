import { Component, h } from 'preact';
import SettingsMenu from './SettingsMenu';
import Tutorial from './Tutorial';
import Extensions from './Extensions';
import Info from './Info';
import './style.css';

export default class OptionsMenuContent extends Component {
  render ({ view }) {
    switch (view) {
      case 'Info':
        return <Info />;
      case 'Tutorial':
        return <Tutorial />;
      case 'Settings':
        return <SettingsMenu />;
      case 'Extensions':
        return <Extensions />;
      default:
        return <p> Invalid View </p>;
    }
  }
}
