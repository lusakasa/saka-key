import { Component, h } from 'preact';

export default class ToggleButton extends Component {
  render ({ label, activeText, inactiveText, key, active = true }) {
    return (
      <li className='mdc-list-item' style='justify-content: space-between'>
        <span>{ label }</span>
        { active
          ? <button className='mdc-button mdc-button--raised mdc-button--accent mdc-ripple-upgraded'>{activeText}</button>
          : <button className='mdc-button mdc-button--raised mdc-button--primary mdc-ripple-upgraded'>{inactiveText}</button> }
      </li>
    );
  }
}
