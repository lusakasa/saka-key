import { Component, h } from 'preact'
import OptionWidget from './OptionWidgets'

export default class SettingsCardOptionWidget extends Component {
  render (props) {
    return <OptionWidget {...props} onChange={this.onChange} />
  }

  onChange = newValue => {
    this.props.setOption(this.props._key, newValue)
  }
}
