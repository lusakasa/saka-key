import { Component, h } from 'preact'
import { connect } from 'react-redux'
import { store } from '../reducers'
import { initConfig } from '../actions'
import CommandList from './CommandList'

class CommandMenu extends Component {
  componentDidMount () {
    fetch(chrome.runtime.getURL('/config.json'))
      .then(response => response.json())
      .then(config => {
        store.dispatch(initConfig(config))
      })
  }

  render ({ loaded, commandCategories }) {
    if (loaded) {
      return (
        <div className='mdc-list-group'>
          {Object.keys(commandCategories).map(category => (
            <div>
              <h3 className='mdc-list-group__subheader'>{category}</h3>
              <CommandList commands={commandCategories[category]} />
              <hr className='mdc-list-divider' />
            </div>
          ))}
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = state => ({
  loaded: state.loaded,
  commandCategories: state.commandCategories
})

export default connect(mapStateToProps)(CommandMenu)
