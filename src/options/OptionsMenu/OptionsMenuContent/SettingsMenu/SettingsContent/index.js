import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import { loadModesConfig, loadSettings, setActiveProfileGroup } from 'options/actions';
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
  render ({
    modesLoaded, settingsLoaded,
    modes, settings, profiles,
    profileGroups, activeProfileGroup }) {
    console.log('settings, modes, profiles', settings, modes, profiles);
    if (!(modesLoaded && settingsLoaded)) return <h3>Loading</h3>;
    return (
      <main className='settings-content'>
        {/* Create the Profile Settings Card */}
        <SettingsCard
          name='Profiles'
          description='Configure your profiles'
          options={[{ type: 'header', header: 'meow' }]}
          onOptionChange={this._onProfileOptionChange}
          profiles={this._ProfileGroupProfiles}
          activeProfile={activeProfileGroup}
          onProfileChange={this._onProfileGroupChange} />
        {/* Create a Setting Card for each Mode */}
        { modes.map((mode) => (
          <SettingsCard
            name={mode.name}
            description={mode.description}
            options={mode.options}
            onOptionChange={this._onModeOptionChange}
            profiles={this._modeProfiles(mode)}
            activeProfile={this._activeModeProfile(mode)}
            onProfileChange={this._onModeOptionChange} />
        )) }
      </main>
    );
  }
  _ProfileGroupProfiles = this.props.profileGroups.map((p) => p.name)
  _onProfileOptionChange = (mode, profile) => {
    console.log(`ProfileGroup ${this.props.activeProfile}'s changed mode ${mode} to ${profile}`);
  }
  _onProfileGroupChange = (newProfileGroupName) => {
    console.log(`Changing to ProfileGroup ${newProfileGroupName}`);
    this.props.dispatch(setActiveProfileGroup(newProfileGroupName));
  }
  _onModeOptionChange = () => {}
  /** get the list of profiles for the given mode */
  _modeProfiles = (mode) => {
    return this.props.settings[mode.name].map((profile) => profile.name);
  }
  /** get active mode profile for the active ProfileGroup */
  _activeModeProfile = (mode) => {
    return this.props.profileGroups.find((pg) => pg.name === this.props.activeProfileGroup).settings[mode.name];
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SettingsContent);
