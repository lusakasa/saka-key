import { Component, h } from 'preact';
import SettingsCardHeader from './SettingsCardHeader';
import SettingsCardOptionWidget from './SettingsCardOptionWidget';

import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/select/dist/mdc.select.css';
import '@material/fab/dist/mdc.fab.css';
import './style.css';


// function parseVisibleString (input) {
//   const res = /(.*)\s*=\s*(.*)/.exec(input);
//   return {
//     dependentKey: res[1].trim(),
//     acceptValue: JSON.parse(res[2].trim())
//   };
// }


// in:
// * name
// * description
// * options: [{ key, value, ...other }]
// exposes:
// * onOptionChange((key, newValue) => {})
// * onProfileChange((newProfileName) => {})
export default class SettingsCard extends Component {
  isVisible = (option) => {
    if (!option.hasOwnProperty('visible')) return true;
    if (option['visible'] === true) return true;
    if (option['visible'] === false) return false;
    return option.visible
      .split('&&')
      .map((clause) => clause.trim())
      .every((clause) => {
        const [key, op, value] = clause.split(' ').map((s) => s.trim());
        switch (op) {
          case '=':
            return this.props.values[key] === JSON.parse(value);
          case '!=':
            return this.props.values[key] !== JSON.parse(value);
          case 'is':
            return this.isVisible(this.props.options.find((o) => o.key === key));
          case 'not':
            return !this.isVisible(this.props.options.find((o) => o.key === key));
          default:
            throw Error(`Option '${option.key}' has invalid visible condition: '${option.visible}'`);
        }
      });
  }

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
      onProfileChange,
      onProfileNew,
      onProfileDelete,
      onProfileDuplicate,
      onProfileRename
  }) {
    return (
      <div
        id={`settings_card_${name}`}
        class='mdc-card demo-card demo-card--with-avatar mode-card'>

        <SettingsCardHeader
          name={name}
          profiles={profiles}
          selectedProfile={selectedProfile}
          onProfileChange={onProfileChange}
          onProfileNew={onProfileNew}
          onProfileDelete={onProfileDelete}
          onProfileDuplicate={onProfileDuplicate}
          onProfileRename={onProfileRename}
        />

        <section class='mdc-card__primary'>
          <h2 class='mdc-card__subtitle'>{ description }</h2>
        </section>

        <ul className='mdc-list mdc-list--dense'>
          { options.length === 0
            ? 'No settings to configure'
            : options.map((option) => (
              this.isVisible(option)
              ? <SettingsCardOptionWidget
                {...option}
                _key={option.key}
                value={values && values[option.key]}
                onChange={onOptionChange} />
              : undefined
              ))
          }
        </ul>

      </div>
    );
  }
}
