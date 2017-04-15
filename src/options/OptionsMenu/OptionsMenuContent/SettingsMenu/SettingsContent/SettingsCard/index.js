import { Component, h } from 'preact';
import SettingsCardHeader from './SettingsCardHeader';
import SettingsCardOptionWidget from './SettingsCardOptionWidget';

import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/select/dist/mdc.select.css';
import '@material/fab/dist/mdc.fab.css';
import './style.css';

// in:
// * name
// * description
// * options: [{ key, value, ...other }]
// exposes:
// * onOptionChange((key, newValue) => {})
// * onProfileChange((newProfileName) => {})
export default class SettingsCard extends Component {
  /**
   * render function
   * @param {object} arg
   * @param {string} arg.name
   * @param {string} arg.description
   * @param {Array<string>} arg.profiles
   * @param {string} arg.selectedProfile
   * @param {Array<{ type: string, key: string, label: string, {...other}}>} arg.options
   * @param {{key: string, value: any}} arg.values
   * @param {(key, newValue) => void} arg.onOptionChange
   * @param {(newProfileName) => void} arg.onProfileChange
   */
  render ({
      name,
      description,
      profiles,
      selectedProfile,
      options,
      values,
      onOptionChange,
      onProfileChange
  }) {
    return (
      <div
        id={`settings_card_${name}`}
        class='mdc-card demo-card demo-card--with-avatar mode-card'>

        <SettingsCardHeader
          name={name}
          profiles={profiles}
          selectedProfile={selectedProfile}
          onProfileChange={onProfileChange} />

        <section class='mdc-card__primary'>
          <h2 class='mdc-card__subtitle'>{ description }</h2>
        </section>

        <ul className='mdc-list mdc-list--dense'>
          { options.length === 0
            ? 'No settings to configure'
            : options.map((option) =>
              <SettingsCardOptionWidget {...option} _key={option.key} value={values && values[option.key]} onChange={onOptionChange} />
            ) }
        </ul>

      </div>
    );
  }
}
