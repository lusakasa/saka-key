import { connect } from 'preact-redux';
import { setActiveProfileGroup } from 'options/actions';
import SettingsCard from '../SettingsCard';

const mapStateToProps = ({ profileGroups, activeProfileGroup }) => {
  return {
    name: 'Profiles',
    description: 'Configure your profiles',
    profiles: profileGroups.map((profile) => profile.name),
    selectedProfile: activeProfileGroup,
    options: [{ type: 'header', header: 'meow' }],
    values: []
  };
};
const mapDispatchToProps = (dispatch) => ({
  onOptionChange: (activeProfileGroup) => (mode, newProfileName) => {
    console.log(`ProfileGroup ${activeProfileGroup}'s changed mode ${mode} to ${newProfileName}`);
  },
  onProfileChange: (newProfileGroupName) => {
    console.log(`Changing to ProfileGroup ${newProfileGroupName}`);
    dispatch(setActiveProfileGroup(newProfileGroupName));
  }
});
const mergeProps = (stateProps, dispatchProps, ownProps) => (
  Object.assign({}, stateProps, dispatchProps, {
    onOptionChange: dispatchProps.onOptionChange(stateProps.selectedProfile)
  })
);
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SettingsCard);
