import { Component, h } from 'preact';
import { friendlyKeyboardEventString } from 'lib/keys';

import './style.css';

const testBindings = [
  [{ 'key': 'H' }],
  [{ 'key': 'g' }, { 'key': 'a' }]
];

const Binding = ({ binding }) => (
  <li className='mdc-list-item command-entry'>
    <span>
      { binding.map((key) => (
        <span>{ friendlyKeyboardEventString(key) }</span>
      )) }
    </span>
    <button className='mdc-button'>Delete</button>
  </li>
);

export default class Keybinding extends Component {
  constructor () {
    super();
    this.state = ({ active: false });
  }
  render ({ label, key, bindings = testBindings }) {
    return this.state.active ? (
      <li className='mdc-card mdc-list-item' onClick={() => this.setState({ active: false })}>
        <label>{ label }</label>
        <ul className='mdc-list mdc-list--dense command-list'>
          { bindings.map((binding) => (
            <Binding binding={binding} />
          )) }
        </ul>
      </li>
    ) : (
      <li className='mdc-list-item' onClick={() => this.setState({ active: true })}>
        <label>{ label }</label>
      </li>
    );
  }
}
