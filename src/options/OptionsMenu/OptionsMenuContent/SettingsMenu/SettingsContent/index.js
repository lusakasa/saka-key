import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import ModeCard from './ModeCard';
import { loadModesConfig, loadSettings } from 'options/actions';
import SettingsCard from './SettingsCard';


/**
 * Main area containing Settings Cards used to configure profiles
 * and settings for each mode.
 * Props:
 * * modes: Array<{ modeName, modeDescription, Array<{ optionType, optionKey, optionValue, ...other}>>
 * * settings: { [modeName]: Array<{ profileName, settings: { [key]: values } }>}
 * * profileGroups: Array<{ profileGroupName, settings: { [modeName]: profileName }}>
 * * activeProfileGroup: profileGroupName
 */


const testProfileGroups = [
  {
    name: 'standard',
    settings: {
      Basic: 'standard',
      Command: 'standard',
      Hints: 'standard',
      Developer: 'standard'
    }
  },
  {
    name: 'left hand',
    settings: {
      Basic: 'standard',
      Command: 'left hand',
      Hints: 'left hand',
      Developer: 'standard'
    }
  }
];
const testActiveProfileGroup = 'standard';

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
  render ({ modes, settings, profiles }) {
    console.log('settings, modes, profiles', settings, modes, profiles);
    return (
      <main className='settings-content'>
        <SettingsCard
          name='Profiles'
          description='Configure your profiles'
          options={[{ type: 'header', header: 'meow' }]}
          onOptionChange={this._onProfileOptionChange}
          profiles={testProfileGroups.map((p) => p.name)}
          activeProfile={testActiveProfileGroup}
          onProfileChange={this._onProfileGroupChange} />

        { modes.map((mode) => (
          <ModeCard {...mode} profiles={settings[mode.name]} />
        )) }
      </main>
    );
  }
  _onProfileOptionChange = (mode, profile) => {
    console.log(`ProfileGroup ${this.props.activeProfile}'s changed mode ${mode} to ${profile}`);
  }
  _onProfileGroupChange = (newProfileGroupName) => {
    console.log(`Changing to ProfileGroup ${newProfileGroupName}`);
  }
}

const mapStateToProps = ({ modes, settings }) => ({ modes, settings });
export default connect(mapStateToProps)(SettingsContent);
