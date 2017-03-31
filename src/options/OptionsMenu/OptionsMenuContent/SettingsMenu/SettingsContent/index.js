import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import { loadModes, loadSettings, loadProfileGroups, loadActiveProfileGroup, loadSelectedProfileForMode } from 'options/actions';
import ModeSettingsCard from './ModeSettingsCard';
import ProfileSettingsCard from './ProfileSettingsCard';

class SettingsContent extends Component {
  constructor (props) {
    super(props);
    browser.storage.local.get(['modes', 'settings', 'profileGroups', 'activeProfileGroup', 'selectedProfileForMode'])
      .then(({ modes, settings, profileGroups, activeProfileGroup, selectedProfileForMode }) => {
        props.dispatch(loadModes(modes));
        props.dispatch(loadSettings(settings));
        props.dispatch(loadProfileGroups(profileGroups));
        props.dispatch(loadActiveProfileGroup(activeProfileGroup));
        props.dispatch(loadSelectedProfileForMode(selectedProfileForMode));
      });
    browser.storage.onChanged.addListener((changes, area) => {
      if (area === 'local') {
        if (changes.hasOwnProperty('modes')) {
          props.dispatch(loadModes(changes.modes.newValue));
        }
        if (changes.hasOwnProperty('settings')) {
          props.dispatch(loadSettings(changes.settings.newValue));
        }
        if (changes.hasOwnProperty('profileGroups')) {
          props.dispatch(loadProfileGroups(changes.profileGroups.newValue));
        }
        if (changes.hasOwnProperty('activeProfileGroup')) {
          props.dispatch(loadActiveProfileGroup(changes.activeProfileGroup.newValue));
        }
        if (changes.hasOwnProperty('selectedProfileForMode')) {
          props.dispatch(loadSelectedProfileForMode(changes.selectedProfileForMode.newValue));
        }
      }
    });
  }
  /**
   * render function
   * @param {object} arg
   * @param {Array<{ modeName, modeDescription, Array<{ type, key, label, {...other} }>>} arg.modes
   * @param {{ [modeName]: Array<{ profileName, settings: { [key]: values } }>}} arg.settings
   * @param {Array<{ profileGroupName, settings: { [modeName]: profileName }}} arg.profileGroups
   * @param {string} arg.activeProfileGroup
   * @param {{ [modeName]: profileName }} arg.selectedProfileForMode
   */
  render ({
    modes,
    settings,
    profileGroups,
    activeProfileGroup,
    selectedProfileForMode
  }) {
    if (modes === null) return <h3>Modes not loaded</h3>;
    if (settings === null) return <h3>Settings not loaded</h3>;
    if (profileGroups === null) return <h3>ProfileGroups not loaded</h3>;
    if (activeProfileGroup === null) return <h3>ActiveProfileGroup not loaded</h3>;
    if (selectedProfileForMode === null) return <h3>SelectedProfileForMode not loaded</h3>;
    return (
      <main className='settings-content'>
        <ProfileSettingsCard />
        { modes.map((mode) => <ModeSettingsCard mode={mode} />) }
      </main>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SettingsContent);
