import { connect } from 'preact-redux';
import { setActiveProfileGroup } from 'options/actions';
import SettingsCard from '../SettingsCard';

const mapStateToProps = ({ profileGroups, activeProfileGroup, settings, selectedProfileForMode }) => {
  // one option for each mode
  // the options will be a dropdown with an item for each profile
  const options = Object.entries(settings).map(([modeName, profiles]) => ({
    type: 'select',
    label: modeName,
    key: modeName,
    value: selectedProfileForMode[modeName],
    choices: profiles.map((p) => p.name)
  }));
  return {
    name: 'Profiles',
    description: 'Configure your profiles',
    profiles: profileGroups.map((profile) => profile.name),
    selectedProfile: activeProfileGroup,
    options: options,
    values: selectedProfileForMode
  };
};
const mapDispatchToProps = (dispatch) => ({
  onOptionChange: (activeProfileGroup) => (mode, newProfileName) => {

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
