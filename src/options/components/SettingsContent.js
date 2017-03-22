import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import ModeCard from './ModeCard';
import { loadModesConfig, loadSettings } from '../actions';

class SettingsContent extends Component {
  constructor (props) {
    super(props);
    browser.storage.local.get('modesConfig').then(({ modesConfig }) => {
      props.dispatch(loadModesConfig(modesConfig));
    });
    browser.storage.local.get('settings').then(({ settings }) => {
      console.log('settings', settings);
      props.dispatch(loadSettings(settings));
    });
  }
  render ({ modes, settings }) {
    console.log('settings, modes', settings, modes);
    return (
      <main className='settings-content'>
        { modes.map((mode) => (
          <ModeCard {...mode} profiles={settings[mode.name]} />
        )) }
      </main>
    );
  }
}

const mapStateToProps = ({ modes, settings }) => ({ modes, settings });
export default connect(mapStateToProps)(SettingsContent);
