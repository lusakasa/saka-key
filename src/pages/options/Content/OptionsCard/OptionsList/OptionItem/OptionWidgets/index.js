import { Component, h } from 'preact'
import Header from './Header'
import Unknown from './Unknown'
import Keybinding from './Keybinding'
import Select from './Select'
import ToggleButton from './ToggleButton'
import Switch from './Switch'
import Checkbox from './Checkbox'
import Color from './Color'
import Text from './Text'
import Number from './Number'
import TextArea from './TextArea'
import Info from './Info'

// must pass:
// * value
// * onValueChange((newValue) => {})

function optionWidgetByType (type) {
  switch (type) {
    case 'header':
      return Header
    case 'info':
      return Info
    case 'keybinding':
      return Keybinding
    case 'select':
      return Select
    case 'togglebutton':
      return ToggleButton
    case 'checkbox':
      return Checkbox
    case 'switch':
      return Switch
    case 'color':
      return Color
    case 'text':
      return Text
    case 'number':
      return Number
    case 'textarea':
      return TextArea
    default:
      return Unknown
  }
}

export default class OptionWidget extends Component {
  render (props) {
    const Widget = optionWidgetByType(props.type)
    return <Widget {...props} />
  }
}
