import { connect } from 'preact-redux';
import { setSelectedProfileForMode, setSetting } from 'options/actions';
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
const mapDispatchToProps = (profile) => (dispatch) => ({
  onOptionChange: (mode, profile) => (key, value) => {
    dispatch(setSetting(mode, profile, key, value));
  },
  onProfileChange: (modeName) => (newProfileName) => {
    dispatch(setSelectedProfileForMode(modeName, newProfileName));
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, stateProps, dispatchProps, {
    onOptionChange: dispatchProps.onOptionChange(stateProps.name, stateProps.selectedProfile),
    onProfileChange: dispatchProps.onProfileChange(stateProps.name)
  })
);
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SettingsCard);
