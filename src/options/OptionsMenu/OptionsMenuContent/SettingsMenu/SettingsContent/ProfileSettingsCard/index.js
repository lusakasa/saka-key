import { connect } from 'preact-redux';
import { setActiveProfileGroup, setProfileGroupOption } from 'options/actions';
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
    description: 'Configure your active profile by selecting per-mode sub-profiles. Coming soon: specify profiles per-url match pattern https://developer.chrome.com/extensions/match_patterns',
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
  }
});
const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, stateProps, dispatchProps, {
    onOptionChange: dispatchProps.onOptionChange(stateProps.selectedProfile)
  })
);
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SettingsCard);
