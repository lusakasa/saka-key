import { h } from 'preact';
import { connect } from 'preact-redux';
import { setActiveProfile } from 'pages/options/actions';

const Select = ({ profiles, activeProfile, setActiveProfile }) => (
  <select
    className='mdc-select mode-card-select'
    value={activeProfile}
    onChange={(e) => setActiveProfile(e.target.value)} >
    { profiles.map((profile) =>
      <option value={profile}>{profile}</option>
    )}
  </select>
);

const mapDispatchToProps = (dispatch, { category }) => ({
  setActiveProfile: (profile) => dispatch(setActiveProfile(category, profile))
});

export default connect(null, mapDispatchToProps)(Select);
