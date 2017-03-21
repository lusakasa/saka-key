import { Component, h } from 'preact';
import OptionWidget from './OptionWidgets';

export default class ModeCard extends Component {
  render ({ name, description, options }) {
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
        {/*<section class='mdc-card__supporting-text'>*/}
        <ul className='mdc-list mdc-list--dense'>
          { options.length === 0
            ? 'No settings to configure'
            : options.map((option) => <OptionWidget option={option} />) }
        {/*</section>*/}
        </ul>
      </div>
    );
  }
}
