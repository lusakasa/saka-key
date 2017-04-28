import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import ModeSettingsCard from './ModeSettingsCard';
// import ProfileSettingsCard from './ProfileSettingsCard';

class SettingsContent extends Component {
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
        {/* <ProfileSettingsCard /> */}
        { modes.map((mode) => <ModeSettingsCard mode={mode} />) }
      </main>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SettingsContent);
