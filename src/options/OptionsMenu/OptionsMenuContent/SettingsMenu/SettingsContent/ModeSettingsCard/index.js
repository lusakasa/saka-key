import { connect } from 'preact-redux';
import SettingsCard from '../SettingsCard';

const mapStateToProps = ({ settings, selectedProfileForMode }, { mode }) => {
  const { name, description, options } = mode;
  const modeSettings = settings[name];
  const selectedProfile = selectedProfileForMode[name];
  return {
    name,
    description,
    profiles: modeSettings.map((profile) => profile.name),
    selectedProfile,
    options,
    values: modeSettings.find((profile) => profile.name === selectedProfile).settings
  };
};
const mapDispatchToProps = (dispatch) => ({
  onOptionChange: (key, newValue) => {

  },
  onProfileChange: (newProfileName) => {

  }
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingsCard);
