import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import ProfileGroupSelect, { ProfileGroupSelectTest } from './ProfileGroupSelect';

class ProfileSelectMenu extends Component {
  render ({ name, description, options, profiles, dispatch }) {
    return (
      <div class='mdc-card demo-card demo-card--with-avatar mode-card'>
        <header className='mdc-toolbar saka-toolbar settings-header'>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
            <span className='mdc-toolbar__title'>Profiles</span>
          </section>
        </header>
        <section class='mdc-card__primary'>
          <h2 class='mdc-card__subtitle'>Select your settings profile</h2>
        </section>
        <ProfileGroupSelectTest />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ view: state.view });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(ProfileSelectMenu);
