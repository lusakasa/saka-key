import { Component, h } from 'preact';
import Header from './Header';
import Keybinding from './Keybinding';
import Select from './Select';
import ToggleButton from './ToggleButton';
import Switch from './Switch';
import Checkbox from './Checkbox';
import Color from './Color';
import Text from './Text';
import Textarea from './TextArea';

// must pass:
// * value
// * onValueChange((newValue) => {})

export default class OptionWidget extends Component {
  render (props) {
    if (props.visible) {
      
    }
    switch (props.type) {
      case 'header':
        return <Header {...props} />;
      case 'keybinding':
        return <Keybinding {...props} />;
      case 'select':
        return <Select {...props} />;
      case 'togglebutton':
        return <ToggleButton {...props} />;
      case 'checkbox':
        return <Checkbox {...props} />;
      case 'switch':
        return <Switch {...props} />;
      case 'color':
        return <Color {...props} />;
      case 'text':
        return <Text {...props} />;
      case 'textarea':
        return <Textarea {...props} />;
      default:
        return <h1>Unknown Options Type {props.type}</h1>;
    }
  }
}
