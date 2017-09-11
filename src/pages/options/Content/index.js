import { Component, h } from 'preact'
import { connect } from 'preact-redux'
import OptionsCard from './OptionsCard'
import './style.css'

class SettingsContent extends Component {
  render({ categories }) {
    return (
      <main className="settings-content">
        {categories.map(category => <OptionsCard category={category} />)}
      </main>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories })
export default connect(mapStateToProps)(SettingsContent)
