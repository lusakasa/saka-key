import { Component, h } from 'preact';
import { isModifierKey } from 'lib/keys';
import KeybindingItem from './KeybindingItem';

export default class KeyBindingInput extends Component {
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
    const { code, key, shiftKey, ctrlKey, altKey, metaKey } = event;
    this.setState({
      keyEvents: this.state.keyEvents.concat({
        code, key, shiftKey, ctrlKey, altKey, metaKey
      })
    });
  }
  render ({ value, setValue, physicalKeys, ignoreModifierKeys }) {
    return this.state.active
    ? (
      <div>
        <KeybindingItem
          binding={this.state.keyEvents}
          physicalKeys={physicalKeys}
          ignoreModifierKeys={ignoreModifierKeys}
        />
        <input
          id='meow'
          ref={(input) => input && input.focus && setTimeout(() => { input.focus(); }, 0)}
          className='keybinding-key keybinding-input mdc-typography--body1 mdc-elevation--z2'
          type='text'
          onKeyDown={this.handleKeyDown(value, setValue)}
          onBlur={this.finalizeInput(value, setValue)} />
      </div>
    ) : (
      <button
        onClick={() => { this.setState({ active: true }); }}
        className='mdc-button mdc-button--raised mdc-button--primary mdc-ripple-upgraded'>
        Add Binding
      </button>
    );
  }
}
