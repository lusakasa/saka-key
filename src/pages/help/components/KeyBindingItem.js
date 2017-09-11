import { Component, h } from 'preact'
import { connect } from 'preact-redux'
import { friendlyKeyboardEventString } from 'lib/keys'

class KeyBindingItem extends Component {
  render({ binding }) {
    return (
      <span>
        {binding.map(key => (
          <span className={'key-text mdc-typography--body1'}>
            {friendlyKeyboardEventString(key)}
          </span>
        ))}
      </span>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(KeyBindingItem)
