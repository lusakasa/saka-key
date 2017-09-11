import { Component, h } from 'preact'
import { connect } from 'preact-redux'
import KeyBindingItem from './KeyBindingItem'

class KeyBindingsMenu extends Component {
  render({ command, bindings }) {
    return (
      <span>
        {bindings.map((binding, i) => (
          <span>
            <KeyBindingItem binding={binding} />
            {i === bindings.length - 1 ? '' : <span>, </span>}
          </span>
        ))}
        {/* <span style={{ color: 'green' }}> &#10753;</span> */}
      </span>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(KeyBindingsMenu)
