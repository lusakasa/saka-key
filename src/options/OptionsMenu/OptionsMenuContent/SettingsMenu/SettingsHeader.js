import { h } from 'preact';
import { connect } from 'preact-redux';
import { viewProfile } from 'options/actions';

const ProfileTab = ({ name, activeProfile, activate }) => (
  <span
    className={`mdc-typography--subheading1 saka-toolbar-item ${
      name === activeProfile ? 'saka-toolbar-item__active' : ''}`}
    onClick={activate(name)}>{ name }</span>
);

const SettingsHeader = ({ profile, viewProfile }) => (
  <header className='mdc-toolbar saka-toolbar settings-header'>
    <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
      <ProfileTab name='Standard' activeProfile={profile} activate={viewProfile} />
      <ProfileTab name='Left Hand' activeProfile={profile} activate={viewProfile} />
      <ProfileTab name='Right Hand' activeProfile={profile} activate={viewProfile} />
      <ProfileTab name='Vimium' activeProfile={profile} activate={viewProfile} />
    </section>
  </header>
);

const mapStateToProps = (state) => ({ profile: state.profile });
const mapDispatchToProps = (dispatch) => ({
  viewProfile: (profile) => () => { dispatch(viewProfile(profile)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHeader);
