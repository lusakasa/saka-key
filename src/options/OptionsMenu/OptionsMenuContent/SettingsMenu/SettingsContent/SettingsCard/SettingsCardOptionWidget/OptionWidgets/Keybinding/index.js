import { Component, h } from 'preact';
import { friendlyKeyboardEventString, isModifierKey } from 'lib/keys';
import './style.css';

// TODO: This file is messy, redo at some point

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
    { bindings && bindings.map((binding, i) =>
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
  finalizeInput = (bindings, setValue) => () => {
    const keyEvents = this.state.keyEvents;
    if (keyEvents.length > 0) {
      setValue(bindings.concat([this.state.keyEvents]));
    }
    this.setState({ active: false, keyEvents: [] });
  }
  handleKeyDown = (bindings, setValue) => (event) => {
    event.preventDefault();
    if (isModifierKey(event)) return;
    if (event.key === 'Enter') {
      this.finalizeInput(bindings, setValue)();
      return;
    }
    const { shiftKey, altKey, ctrlKey, metaKey, code, key } = event;
    this.setState({
      keyEvents: this.state.keyEvents.concat({
        shiftKey, altKey, ctrlKey, metaKey, code, key
      })
    });
  }
  render ({ value, setValue }) {
    return this.state.active
    ? (
      <div>
        <KeyBindingItem binding={this.state.keyEvents} />
        <input
          id='meow'
          ref={(input) => input && input.focus && setTimeout(() => { input.focus(); }, 0)}
          className='key-text key-text-input mdc-typography--body1 mdc-elevation--z2'
          type='text'
          onKeyDown={this.handleKeyDown(value, setValue)}
          onBlur={this.finalizeInput(value, setValue)} />
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
  render ({ label, key, value, onChange }) {
    const bindings = value;
    return this.state.active ? (
      <li
        tabIndex={0}
        className='mdc-card mdc-list-item'
        style='height: auto; padding: 12px 0px;'>
        <ul
          className='command-list'
          style={`
            display: inline-flex;
            flex-direction: column;
            width: 90%;`}>
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
          { bindings && bindings.map((binding) => (
            <li
              className='mdc-list-item'
              style='justify-content: space-between;'>
              <KeyBindingItem binding={binding} />
              <button
                onClick={() => onChange(bindings.filter((b) => b !== binding))}
                className='mdc-button mdc-button--secondary'>
                  Delete
              </button>
            </li>
          )) }
        </ul>
        <span
          style='width: 90%; display: flex; justify-content: space-between;'>
          <KeyBindingInput value={value} setValue={onChange} />
        </span>
      </li>
    ) : (
      <li
        tabIndex={0}
        className='mdc-list-item'
        style='justify-content: space-between; cursor: pointer;'
        role='button'
        onClick={() => { this.setState({ active: true }); }}
      >
        <label>{ label }</label>
        <HelpBindings bindings={bindings} />
      </li>
    );
  }
}
