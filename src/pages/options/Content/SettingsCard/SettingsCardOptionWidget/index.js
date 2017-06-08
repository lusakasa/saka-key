import { Component, h } from 'preact';
import OptionWidget from './OptionWidgets';

export default class SettingsCardOptionWidget extends Component {
  render (props) {
    return <OptionWidget {...props} onChange={this._onChange} />;
  }
  _onChange = (newValue) => {
    this.props.onChange(this.props._key, newValue);
  }
}
