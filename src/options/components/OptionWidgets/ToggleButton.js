import { Component, h } from 'preact';

export default class ToggleButton extends Component {
  render ({ label, activeText, inactiveText, key, value, setValue }) {
    const active = value;
    return (
      <li className='mdc-list-item' style='justify-content: space-between'>
        <span>{ label }</span>
        { active
          ? <button
            className='mdc-button mdc-button--raised mdc-button--accent mdc-ripple-upgraded'
            onClick={(e) => setValue(false)}>{activeText}</button>
          : <button
            className='mdc-button mdc-button--raised mdc-button--primary mdc-ripple-upgraded'
            onChange={(e) => setValue(true)}>{inactiveText}</button> }
      </li>
    );
  }
}
