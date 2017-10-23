import { Component, h } from 'preact'
import TextArea from '../TextArea'

const DEFAULT = {
  source: 'document.body.style.backgroundColor = "blue"'
}

class CustomCommand extends Component {
  render ({ command, onChange }) {
    return (
      <li>
        <p>This is a command</p>
        <TextArea
          label='Source'
          value={command.source}
          onChange={s => onChange({ source: s, ...command })}
        />
      </li>
    )
  }
}

export default class CustomCommands extends Component {
  render ({ key, value, onChange, ...rest }) {
    console.log('CustomCommands', key, value, rest)
    return (
      <li>
        <ul>
          {value &&
            value.map((cmd, i, cmds) => {
              let cmdChange = cmd => {
                let updated = cmds.slice()
                updated[i] = cmd
                onChange(updated)
              }
              return <CustomCommand command={cmd} onChange={cmdChange} />
            })}
        </ul>
        <button onClick={e => onChange([...value, DEFAULT])}>
          New custom command
        </button>
      </li>
    )
  }
}
