import { Component, h } from 'preact';

export default class Keybinding extends Component {
  render ({ label, value }) {
    return (
      <div>
        <label>{ label }</label>
      </div>
    );
  }
}
