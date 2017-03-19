import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import CommandMenu from './CommandMenu';
import { viewProfile } from '../actions';

const ProfileTab = ({ name, activeProfile, activate }) => (
  <span
    className={`mdc-typography--subheading1 saka-toolbar-item ${
      name === activeProfile ? 'saka-toolbar-item__active' : ''}`}
    onClick={activate(name)}>{ name }</span>
);

export class SettingsMenu extends Component {
  render ({ profile, viewProfile }) {
    return (
      <div className={'settings-menu'}>
        <header className='mdc-toolbar saka-toolbar'>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
            <ProfileTab name='Standard' activeProfile={profile} activate={viewProfile} />
            <ProfileTab name='Left Hand' activeProfile={profile} activate={viewProfile} />
            <ProfileTab name='Right Hand' activeProfile={profile} activate={viewProfile} />
            <ProfileTab name='Vimium' activeProfile={profile} activate={viewProfile} />
          </section>
        </header>
        <main>
          <CommandMenu />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ profile: state.profile });
const mapDispatchToProps = (dispatch) => ({
  viewProfile: (profile) => () => { dispatch(viewProfile(profile)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu);
