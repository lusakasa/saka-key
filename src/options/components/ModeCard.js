import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import OptionWidget from './OptionWidgets';
import { changeSetting } from '../actions';

class ModeCard extends Component {
  render ({ name, description, options, profiles, dispatch }) {
    return (
      <div class='mdc-card demo-card demo-card--with-avatar mode-card'>
        <header className='mdc-toolbar saka-toolbar settings-header'>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
            <span className='mdc-toolbar__title'>{ name }</span>
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
