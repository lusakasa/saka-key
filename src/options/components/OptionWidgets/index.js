import { Component, h } from 'preact';
import Header from './Header';
import Keybinding from './Keybinding';
import ToggleButton from './ToggleButton';
import Color from './Color';

export default class OptionWidget extends Component {
  render ({ option }) {
    switch (option.type) {
      case 'header':
        return <Header {...option} />;
      case 'keybinding':
        return <Keybinding {...option} />;
      case 'toggleButton':
        return <ToggleButton {...option} />;
      case 'color':
        return <Color {...option} />;
      default:
        return <h1>Unknown Options Type {option.type}</h1>;
    }
  }
}
