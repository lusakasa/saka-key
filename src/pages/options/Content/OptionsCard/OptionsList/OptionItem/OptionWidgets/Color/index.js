import { Component, h } from 'preact'

export default class Color extends Component {
  render({ label, key, value, onChange }) {
    return (
      <li className="mdc-list-item color-widget">
        <label>{label}</label>
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </li>
    )
  }
}
