import { Component, h } from 'preact';

export default class ModeCard extends Component {
  render ({ mode }) {
    return (
      <div class='mdc-card demo-card demo-card--with-avatar mode-card'>
        <section class='mdc-card__primary'>
          <div class='demo-card__avatar' />
          <h1 class='mdc-card__title'>{ mode.name }</h1>
          <h2 class='mdc-card__subtitle'>{ mode.description }</h2>
        </section>
        <section class='mdc-card__media demo-card__16-9-media' />
        <section class='mdc-card__supporting-text'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.
        </section>
        <section class='mdc-card__actions'>
          <button class='mdc-button mdc-button--compact mdc-card__action'>Action 1</button>
          <button class='mdc-button mdc-button--compact mdc-card__action'>Action 2</button>
        </section>
      </div>
    );
  }
}
