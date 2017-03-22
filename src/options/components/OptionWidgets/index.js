import { Component, h } from 'preact';
import Header from './Header';
import Keybinding from './Keybinding';
import ToggleButton from './ToggleButton';
import Switch from './Switch';
import Checkbox from './Checkbox';
import Color from './Color';
import Text from './Text';
import Textarea from './TextArea';

export default class OptionWidget extends Component {
  render ({ option, value }) {
    switch (option.type) {
      case 'header':
        return <Header {...option} />;
      case 'keybinding':
        return <Keybinding {...option} value={value} />;
      case 'togglebutton':
        return <ToggleButton {...option} value={value} />;
      case 'checkbox':
        return <Checkbox {...option} value={value} />;
      case 'switch':
        return <Switch {...option} value={value} />;
      case 'color':
        return <Color {...option} value={value} />;
      case 'text':
        return <Text {...option} value={value} />;
      case 'textarea':
        return <Textarea {...option} value={value} />;
      default:
        return <h1>Unknown Options Type {option.type}</h1>;
    }
  }
}
