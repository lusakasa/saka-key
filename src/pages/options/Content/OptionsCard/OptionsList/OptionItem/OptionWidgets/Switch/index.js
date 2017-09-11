import { Component, h } from 'preact'
import './style.css'

export default class Checkbox extends Component {
  render ({ label, key, value, onChange }) {
    return (
      <li className='mdc-list-item' style='justify-content: space-between'>
        <label>{label}</label>
        <div className='mdc-switch'>
          <input
            type='checkbox'
            className='mdc-switch__native-control switch-widget-input-el'
            checked={value}
            onChange={e => onChange(e.target.checked)}
          />
          <div className='mdc-switch__background'>
            <div className='mdc-switch__knob' />
          </div>
        </div>
      </li>
    )
  }
}
