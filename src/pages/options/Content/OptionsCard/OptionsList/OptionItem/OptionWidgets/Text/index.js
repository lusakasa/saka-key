import { Component, h } from 'preact'
import './style.css'

export default class Text extends Component {
  render ({ label, key, value, onChange }) {
    return (
      <li className='mdc-list-item text-widget-li'>
        <label>{label}</label>
        <div className='mdc-textfield' data-demo-no-auto-js=''>
          <input
            type='text'
            className='mdc-textfield__input'
            style='text-align: right'
            value={value}
            onChange={e => onChange(e.target.value)}
          />
        </div>
      </li>
    )
  }
}
