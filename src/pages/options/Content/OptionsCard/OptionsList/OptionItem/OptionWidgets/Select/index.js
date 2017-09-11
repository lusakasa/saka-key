import { Component, h } from 'preact'

export default class Select extends Component {
  render ({ label, key, value, choices, onChange }) {
    return (
      <li className='mdc-list-item color-widget'>
        <label>{label}</label>
        <select
          class='mdc-select'
          style='width: 176px; direction: rtl'
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {choices.map(choice => <option value={choice}>{choice}</option>)}
        </select>
      </li>
    )
  }
}
