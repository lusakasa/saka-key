import { Component, h } from 'preact';

export default class Checkbox extends Component {
  render ({ label, key, value, onChange }) {
    return (
      <li className='mdc-list-item' style='justify-content: space-between'>
        <label>{label}</label>
        <div class='mdc-switch'>
          <input type='checkbox' id='basic-switch' class='mdc-switch__native-control'
            checked={value} onChange={(e) => onChange(e.target.checked)} />
          <div class='mdc-switch__background'>
            <div class='mdc-switch__knob' />
          </div>
        </div>
      </li>
    );
  }
}


