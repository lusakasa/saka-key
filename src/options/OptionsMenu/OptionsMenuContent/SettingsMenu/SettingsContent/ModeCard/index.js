import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import OptionWidget from '../SettingsCard/OptionWidgets';
import { changeSetting } from 'options/actions';

import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/select/dist/mdc.select.css';
import '@material/fab/dist/mdc.fab.css';
import './style.css';

class ModeCard extends Component {
  render ({ name, description, options, profiles, dispatch }) {
    return (
      <div class='mdc-card demo-card demo-card--with-avatar mode-card'>
        <header className='mdc-toolbar saka-toolbar settings-header'>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
            <span className='mdc-toolbar__title'>{ name }</span>
          </section>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-end'>
            {/*<button
              className='mdc-button mdc-button--accent button.mode-card-delete-button'>x</button>*/}
            <select class='mdc-select mode-card-select'>
              <option value='' default selected>Pick a food</option>
              <option value='grains'>Bread, Cereal, Rice, and Pasta</option>
              <option value='vegetables'>Vegetables</option>
              <optgroup label='Fruits'>
                <option value='apple'>Apple</option>
                <option value='oranges'>Orange</option>
                <option value='banana'>Banana</option>
              </optgroup>
              <option value='dairy'>Milk, Yogurt, and Cheese</option>
              <option value='meat'>Meat, Poultry, Fish, Dry Beans, Eggs, and Nuts</option>
              <option value='fats'>Fats, Oils, and Sweets</option>
            </select>
            <button
              className='mdc-button mdc-button--compact mdc-button--dense mdc-button--raised mode-card-button'>new</button>
            <button
              className='mdc-button mdc-button--compact mdc-button--dense mdc-button--raised mdc-buton--accent mode-card-button'>delete</button>
            {/*<button
              className='mdc-fab mdc-fab--mini mode-card-new-button'>+</button>*/}
          </section>
        </header>
        <section class='mdc-card__primary'>
          <h2 class='mdc-card__subtitle'>{ description }</h2>
        </section>
        <ul className='mdc-list mdc-list--dense'>
          { options.length === 0
            ? 'No settings to configure'
            : options.map((option) => {
              const value = profiles && profiles.standard && profiles.standard[option.key];
              const setValue = (value) => {
                dispatch(changeSetting(name, 'standard', option.key, value))
              };
              return <OptionWidget
                {...option}
                value={value}
                setValue={setValue} />;
            }) }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ view: state.view });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(ModeCard);
