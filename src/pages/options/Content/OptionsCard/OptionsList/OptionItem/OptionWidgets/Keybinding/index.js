import { Component, h } from 'preact'
import KeybindingItem from './KeybindingItem'
import KeybindingList from './KeybindingList'
import KeybindingInput from './KeybindingInput'
import './style.css'

// TODO: This file is messy, redo at some point

export default class Keybinding extends Component {
  constructor() {
    super()
    this.state = { active: false }
  }
  render({
    label,
    key,
    value,
    onChange,
    values: { physicalKeys, ignoreModifierKeys }
  }) {
    const bindings = value
    return this.state.active ? (
      <li
        tabIndex={0}
        className="mdc-card mdc-list-item"
        style="height: auto; padding: 12px 0px;"
      >
        <ul className="command-list">
          <li className="mdc-list-item" style="justify-content: space-between;">
            <label>{label}</label>
            <button
              className="mdc-button mdc-button--raised mdc-button--secondary mdc-ripple-upgraded"
              onClick={e => {
                e.stopPropagation()
                this.setState({ active: false })
              }}
            >
              Close
            </button>
          </li>
          {bindings &&
            bindings.map(binding => (
              <li
                className="mdc-list-item"
                style="justify-content: space-between;"
              >
                <KeybindingItem
                  binding={binding}
                  physicalKeys={physicalKeys}
                  ignoreModifierKeys={ignoreModifierKeys}
                />
                <button
                  onClick={() => onChange(bindings.filter(b => b !== binding))}
                  className="mdc-button mdc-button--secondary"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
        <span style="width: 90%; display: flex; justify-content: space-between;">
          <KeybindingInput
            value={value}
            setValue={onChange}
            physicalKeys={physicalKeys}
            ignoreModifierKeys={ignoreModifierKeys}
          />
        </span>
      </li>
    ) : (
      <li
        tabIndex={0}
        className="mdc-list-item"
        style="justify-content: space-between; cursor: pointer;"
        role="button"
        onClick={() => {
          this.setState({ active: true })
        }}
      >
        <label>{label}</label>
        <KeybindingList
          bindings={bindings}
          physicalKeys={physicalKeys}
          ignoreModifierKeys={ignoreModifierKeys}
        />
      </li>
    )
  }
}
