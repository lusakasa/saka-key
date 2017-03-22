import { Component, h } from 'preact';
import { friendlyKeyboardEventString, isModifierKey } from 'lib/keys';
import './style.css';

// TODO: This file is messy, redo at some point

const testBindings = [
  [{ 'key': 'H' }],
  [{ 'key': 'g' }, { 'key': 'a' }]
];

/* const Binding = ({ binding }) => (
  <li className='mdc-list-item command-entry'>
    <span>
      { binding.map((key) => (
        <span>{ friendlyKeyboardEventString(key) }</span>
      )) }
    </span>
    <button className='mdc-button'>Delete</button>
  </li>
); */


const KeyBindingItem = ({ binding }) => (
  <span>
    { binding.map((key) =>
      <span className='key-text mdc-typography--body1 mdc-elevation--z2'>
        {friendlyKeyboardEventString(key)}
      </span>) }
  </span>
);

const HelpBindings = ({ bindings }) => (
  <span>
    { bindings.map((binding, i) =>
      <span>
        <KeyBindingItem binding={binding} />
        { i === bindings.length - 1 ? '' : <span>, </span>}
      </span>) }
  </span>
);

class KeyBindingInput extends Component {
  constructor () {
    super();
    this.state = {
      active: false,
      numKeysPressed: 0,
      keyEvents: []
    };
  }
  finalizeInput = () => {
    const keyEvents = this.state.keyEvents;
    if (keyEvents.length > 0) {
      testBindings.push(this.state.keyEvents);
    }
    this.setState({ active: false, keyEvents: [] });
  }
  handleKeyDown = (event) => {
    event.preventDefault();
    if (isModifierKey(event)) return;
    if (event.key === 'Enter') {
      this.finalizeInput();
      return;
    }
    const { shiftKey, altKey, ctrlKey, metaKey, code, key } = event;
    this.setState({
      keyEvents: this.state.keyEvents.concat({
        shiftKey, altKey, ctrlKey, metaKey, code, key
      })
    });
  }
  render () {
    return this.state.active
    ? (
      <div>
        <KeyBindingItem binding={this.state.keyEvents} />
        <input
          id='meow'
          ref={(input) => input && input.focus && setTimeout(() => { input.focus(); }, 0)}
          className='key-text key-text-input mdc-typography--body1 mdc-elevation--z2'
          type='text'
          onKeyDown={this.handleKeyDown}
          onBlur={this.finalizeInput} />
      </div>
    ) : (
      <button
        onClick={() => { this.setState({ active: true }); console.log(this.base); }}
        className='mdc-button mdc-button--raised mdc-button--primary mdc-ripple-upgraded'>
        Add Binding
      </button>
    );
  }
}


export default class Keybinding extends Component {
  constructor () {
    super();
    this.state = ({ active: false });
  }
  render ({ label, key, bindings = testBindings }) {
    return this.state.active ? (
      <li
        className='mdc-card mdc-list-item'
        style='height: auto; padding: 12px 0px;'>
        <ul
          className='command-list'
          style='
            display: inline-flex;
            flex-direction: column;
            width: 90%;'>
          <li
            className='mdc-list-item'
            style='justify-content: space-between;'>
            <label>{ label }</label>
            <button
              className='mdc-button mdc-button--raised mdc-button--secondary mdc-ripple-upgraded'
              onClick={(e) => { e.stopPropagation(); this.setState({ active: false }); }} >
              Close
            </button>
          </li>
          { bindings.map((binding) => (
            <li
              className='mdc-list-item'
              style='justify-content: space-between;'>
              <KeyBindingItem binding={binding} />
              <button
                className='mdc-button mdc-button--secondary'>
                  Delete
              </button>
            </li>
          )) }
        </ul>
        <span
          style='width: 90%; display: flex; justify-content: space-between;'>
          <KeyBindingInput />
        </span>
      </li>
    ) : (
      <li
        className='mdc-list-item'
        style='justify-content: space-between; cursor: pointer;'
        role='button'
        onClick={() => { this.setState({ active: true }); }}>
        <label>{ label }</label>
        <HelpBindings bindings={bindings} />
      </li>
    );
  }
}
