import { connect } from 'preact-redux';
import SettingsCard from '../SettingsCard';
import {
  setSetting,
  // setSelectedProfileForMode,
  setProfileGroupOption,
  addProfile,
  deleteProfile,
  duplicateProfile,
  renameProfile
} from 'options/actions';

const mapStateToProps = ({ settings, selectedProfileForMode }, { mode }) => {
  // TODO: cleanup
  // the standard checks only exist because when a profile is renamed/created/duplicated,
  // selectedProfileForMode is updated before the actual rename is committed to local storage
  const { name, description, options } = mode;
  const modeSettings = settings[name] || settings['standard'];
  const selectedProfile = selectedProfileForMode[name] || 'standard';
  const { settings: values, errors } = (
    modeSettings.find((profile) => profile.name === selectedProfile) ||
    modeSettings.find((profile) => profile.name === 'standard')
  );
  return {
    name,
    description,
    profiles: modeSettings.map((profile) => profile.name),
    selectedProfile,
    options,
    values,
    errors
  };
};
const mapDispatchToProps = (profile) => (dispatch) => ({
  onOptionChange: (mode, profile) => (key, value) => {
    dispatch(setSetting(mode, profile, key, value));
  },
  onProfileChange: (mode) => (newProfileName) => {
    // dispatch(setSelectedProfileForMode(mode, newProfileName));
    dispatch(setProfileGroupOption('standard', mode, newProfileName));
  },
  onProfileNew: (mode) => (newProfileGroupName) => {
    dispatch(addProfile(mode, newProfileGroupName));
  },
  onProfileDelete: (mode) => (profileGroupName) => {
    dispatch(deleteProfile(mode, profileGroupName));
  },
  onProfileDuplicate: (mode) => (profileGroupName) => {
    dispatch(duplicateProfile(mode, profileGroupName));
  },
  onProfileRename: (mode) => (oldProfileGroupName, newProfileGroupName) => {
    dispatch(renameProfile(mode, oldProfileGroupName, newProfileGroupName));
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, stateProps, dispatchProps, {
    onOptionChange: dispatchProps.onOptionChange(stateProps.name, stateProps.selectedProfile),
    onProfileChange: dispatchProps.onProfileChange(stateProps.name),
    onProfileNew: dispatchProps.onProfileNew(stateProps.name),
    onProfileDelete: dispatchProps.onProfileDelete(stateProps.name),
    onProfileDuplicate: dispatchProps.onProfileDuplicate(stateProps.name),
    onProfileRename: dispatchProps.onProfileRename(stateProps.name)
  })
);
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SettingsCard);

// TODO: make sure to remove these comments
// modes: Array<{ modeName, modeDescription, Array<{ type, key, label, {...other} }>>
// settings: { [modeName]: Array<{ profileName, settings: { [key]: values } }>
// profileGroups: Array<{ profileGroupName, settings: { [modeName]: profileName }
// activeProfileGroup: string
// selectedProfileForMode: { [modeName]: profileName } ** NOT PERSISTED LIKE THE OTHERS, lives only as long as options GUI