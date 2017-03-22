import { Component, h } from 'preact';
import Header from './Header';
import Keybinding from './Keybinding';
import ToggleButton from './ToggleButton';
import Checkbox from './Checkbox';
import Color from './Color';
import Text from './Text';
import Textarea from './TextArea';

export default class OptionWidget extends Component {
  render ({ option }) {
    switch (option.type) {
      case 'header':
        return <Header {...option} />;
      case 'keybinding':
        return <Keybinding {...option} />;
      case 'togglebutton':
        return <ToggleButton {...option} />;
      case 'checkbox':
        return <Checkbox {...option} />;
      case 'color':
        return <Color {...option} />;
      case 'text':
        return <Text {...option} />;
      case 'textarea':
        return <Textarea {...option} />;
      default:
        return <h1>Unknown Options Type {option.type}</h1>;
    }
  }
}
