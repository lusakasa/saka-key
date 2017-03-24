import { Component, h } from 'preact';
import SettingsMenu from './SettingsMenu';
import Tutorial from './Tutorial';
import Extensions from './Extensions';
import About from './About';

export default class OptionsMenuContent extends Component {
  render ({ view }) {
    switch (view) {
      case 'Tutorial':
        return <Tutorial />;
      case 'Settings':
        return <SettingsMenu />;
      case 'Extensions':
        return <Extensions />;
      case 'About':
        return <About />;
      default:
        return <p> Invalid View </p>;
    }
  }
}
