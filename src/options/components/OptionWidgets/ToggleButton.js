import { Component, h } from 'preact';

export default class ToggleButton extends Component {
  render ({ activeLabel, inactiveLabel, key, active = true }) {
    return (
      <div>
        { active
          ? <button style='color: red'>{inactiveLabel}</button>
          : <button style='color: green'>{activeLabel}</button> }
      </div>
    );
  }
}
