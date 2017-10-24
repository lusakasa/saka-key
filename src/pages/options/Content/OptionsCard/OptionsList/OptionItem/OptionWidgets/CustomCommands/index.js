import { Component, h } from 'preact'
import TextArea from '../TextArea'
import Keybinding from '../Keybinding'

const DEFAULT = {
  source: 'document.body.style.backgroundColor = "blue"',
  bindings: [],
}

class CustomCommand extends Component {
  render ({ command, values, onChange }) {
    return (
      <li>
        <textarea
          id="multi-line"
          class="mdc-textfield__input"
          value={command.source}
          rows={command.source.split('\n').length + 3}
          cols="40"
          onChange={e => onChange({ ...command, source: e.target.value })}/>
        <Keybinding
            label="Key Bindings"
            key="foobar"
            value={command.bindings}
            values={values}
            physicalKeys={false}
            ignoreModifierKeys={false}
            onChange={b => onChange({ ...command, bindings: b })}/>
        <button onClick={e => { onChange(undefined) }}>Delete Custom Command</button>
      </li>
    )
  }
}

export default class CustomCommands extends Component {
  render ({ key, value, values, onChange, ...rest }) {
    return (
      <li>
        <ul>
          {value &&
            value.map((cmd, i, cmds) => {
              let cmdChange = cmd => {
                if (!cmd) {
                  // Remove the command from the list.
                  onChange(cmds.slice(0, i).concat(cmds.slice(i+1)))
                } else {
                  // Update the command.
                  let updated = cmds.slice()
                  updated[i] = cmd
                  onChange(updated)
                }
              }
              return <CustomCommand command={cmd} values={values} onChange={cmdChange} />
            })}
        </ul>
        <button onClick={e => onChange([...value, DEFAULT])}>Add Custom Command</button>
      </li>
    )
  }
}
