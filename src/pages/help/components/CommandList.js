import { Component, h } from 'preact'
import { connect } from 'react-redux'
import CommandEntry from './CommandEntry'

class CommandList extends Component {
  render ({ commands, bindings }) {
    return (
      <ul className='mdc-list mdc-list--dense command-list'>
        {commands.map(command => (
          <CommandEntry command={command} bindings={bindings[command]} />
        ))}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  bindings: state.defaultBindings.bindings
})

export default connect(mapStateToProps)(CommandList)
