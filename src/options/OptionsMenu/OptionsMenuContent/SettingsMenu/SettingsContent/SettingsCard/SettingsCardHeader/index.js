import { Component, h } from 'preact';

import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/select/dist/mdc.select.css';

export default class SettingsCardHeader extends Component {
  render ({ name, profiles, selectedProfile, onProfileChange }) {
    return (
      <header className='mdc-toolbar saka-toolbar settings-header'>
        <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
          <span className='mdc-toolbar__title'>{ name }</span>
        </section>
        <section className='mdc-toolbar__section mdc-toolbar__section--align-end'>
          <select
            class='mdc-select mode-card-select'
            value={selectedProfile}
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
