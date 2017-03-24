import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import OptionWidget from './OptionWidgets';

import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/select/dist/mdc.select.css';
import '@material/fab/dist/mdc.fab.css';
import './style.css';

class SettingsCardHeader extends Component {
  render ({ name, profiles, activeProfile, onProfileChange }) {
    return (
      <header className='mdc-toolbar saka-toolbar settings-header'>
        <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
          <span className='mdc-toolbar__title'>{ name }</span>
        </section>
        <section className='mdc-toolbar__section mdc-toolbar__section--align-end'>
          <select
            class='mdc-select mode-card-select'
            value={activeProfile}
            onChange={this._handleChange} >
            { profiles.map((profile) =>
              <option value={profile}>{profile}</option>
            )}
          </select>
          <button
            className='mdc-button mdc-button--compact mdc-button--dense mdc-button--raised mode-card-button'>new</button>
          <button
            className='mdc-button mdc-button--compact mdc-button--dense mdc-button--raised mdc-buton--accent mode-card-button'>delete</button>
        </section>
      </header>
    );
  }
  _handleChange = (e) => {
    this.props.onProfileChange(e.target.value);
  }
}

class SettingsCardOptionWidget extends Component {
  render (props) {
    return <OptionWidget {...props} onChange={this._onChange} />;
  }
  _onChange = (newValue) => {
    this.props.onOptionChange(this.props.key, newValue);
  }
}

// in:
// * name
// * description
// * options: [{ key, value, ...other }]
// exposes:
// * onOptionChange((key, newValue) => {})
// * onProfileChange((newProfileName) => {})
class SettingsCard extends Component {
  render ({ name, description, options, onOptionChange, profiles, activeProfile, onProfileChange }) {
    return (
      <div class='mdc-card demo-card demo-card--with-avatar mode-card'>

        <SettingsCardHeader
          name={name}
          profiles={profiles}
          activeProfile={activeProfile}
          onProfileChange={onProfileChange} />

        <section class='mdc-card__primary'>
          <h2 class='mdc-card__subtitle'>{ description }</h2>
        </section>

        <ul className='mdc-list mdc-list--dense'>
          { options.length === 0
            ? 'No settings to configure'
            : options.map((option) =>
              <SettingsCardOptionWidget {...option} onChange={onOptionChange} />
            ) }
        </ul>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({ view: state.view });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(SettingsCard);
