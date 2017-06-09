import { connect } from 'preact-redux';
import {
  setActiveProfileGroup,
  setProfileGroupOption,
  addProfileGroup,
  deleteProfileGroup,
  duplicateProfileGroup,
  renameProfileGroup
} from 'pages/options/actions';
import SettingsCard from '../SettingsCard';

const mapStateToProps = ({ profileGroups, activeProfileGroup, settings, selectedProfileForMode }) => {
  const profileMap = profileGroups.find((p) => p.name === activeProfileGroup).settings;
  // one option for each mode
  // the options will be a dropdown with an item for each profile
  const options = Object.entries(settings).map(([modeName, profiles]) => ({
    type: 'select',
    label: modeName,
    key: modeName,
    value: profileMap[modeName],
    choices: profiles.map((p) => p.name)
  }));
  return {
    name: 'Profiles',
    description: 'Configure your active profile by selecting per-mode sub-profiles. I realize this separate profile selection menu is unintuitive. It will be phased out in an upcoming release.',
    profiles: profileGroups.map((profile) => profile.name),
    selectedProfile: activeProfileGroup,
    options: options,
    values: profileMap
  };
};
const mapDispatchToProps = (dispatch) => ({
  onOptionChange: (activeProfileGroup) => (mode, newProfileName) => {
    dispatch(setProfileGroupOption(activeProfileGroup, mode, newProfileName));
  },
  onProfileChange: (newProfileGroupName) => {
    dispatch(setActiveProfileGroup(newProfileGroupName));
  },
  onProfileNew: (newProfileGroupName) => {
    dispatch(addProfileGroup(newProfileGroupName));
  },
  onProfileDelete: (profileGroupName) => {
    dispatch(deleteProfileGroup(profileGroupName));
  },
  onProfileDuplicate: (profileGroupName) => {
    dispatch(duplicateProfileGroup(profileGroupName));
  },
  onProfileRename: (oldProfileGroupName, newProfileGroupName) => {
    dispatch(renameProfileGroup(oldProfileGroupName, newProfileGroupName));
  }
});
const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, stateProps, dispatchProps, {
    onOptionChange: dispatchProps.onOptionChange(stateProps.selectedProfile)
  })
);
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SettingsCard);
