import { Component, h } from 'preact';

export default class About extends Component {
  render () {
    return (
      <div class='mdc-card about-card'>
        <img class='mdc-card__media-item mdc-card__media-item--1x' src='logo.png' style='height: 80px' />
        <section class='mdc-card__primary'>
          <h1 class='mdc-card__title mdc-card__title--large'>Saka Key</h1>
          <h2 class='mdc-card__subtitle'>A keyboard interface to the web</h2>
          <h2 class='mdc-card__subtitle'>Version { SAKA_VERSION }</h2>
          <h2 class='mdc-card__subtitle'>By <a href='http://dawoodjee.com' target='_blank'>Sufyan</a></h2>
        </section>
        <section class='mdc-card__actions'>
          <a
            class='mdc-button mdc-button--compact mdc-card__action'
            href='https://github.com/lusakasa/saka-key/issues'
            target='_blank'>Support</a>
          <a
            class='mdc-button mdc-button--compact mdc-card__action'
            href='https://github.com/lusakasa/saka-key'
            target='_blank'>Github</a>
        </section>
      </div>
    );
  }
}
