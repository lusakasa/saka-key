import { Component, h } from 'preact'
import { connect } from 'react-redux'
import Header from './Header'
// import Message from './Message';
import OptionsList from './OptionsList'

import '@material/toolbar/dist/mdc.toolbar.css'
import '@material/select/dist/mdc.select.css'
import '@material/fab/dist/mdc.fab.css'
import './style.css'

class SettingsCard extends Component {
  render (props) {
    return (
      <div
        id={`settings_card_${props.category}`}
        className='mdc-card demo-card demo-card--with-avatar mode-card'
        style={{ backgroundColor: '#ffffff' }}
      >
        <Header {...props} />
        {/* <Message {...props} /> */}
        <OptionsList {...props} />
      </div>
    )
  }
}

const mapStateToProps = (
  { builtInProfiles, activeProfiles, customProfiles },
  { category, setIsEditingName }
) => {
  if (customProfiles[category] === undefined) {
    customProfiles[category] = builtInProfiles[category]
  }

  return {
    activeProfile: activeProfiles[category],
    profiles: [...builtInProfiles[category], ...customProfiles[category]],
    isBuiltInProfile:
      builtInProfiles[category].indexOf(activeProfiles[category]) !== -1
  }
}

export default connect(mapStateToProps)(SettingsCard)
