import { h } from 'preact'
import Tab from './Tab'
import './style.css'

export default ({ view }) => (
  <header className="mdc-toolbar mdc-toolbar--fixed saka-toolbar options-menu-header">
    <div class="mdc-toolbar__row">
      <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
        <a href="info.html" class="mdc-toolbar__title saka-logo-link">
          <img src="logo.png" class="saka-logo" aria-hidden="true" />
          <span class="saka-logo-text">Saka Key</span>
        </a>
      </section>
      <section className="mdc-toolbar__section mdc-toolbar__section--align-end">
        <Tab href="options.html" view={view} name="Options" />
        {/* <Tab href='extensions.html' view={view} name='Extensions' /> */}
        <Tab
          href="https://key.saka.io"
          view={view}
          name="Tutorial"
          target="_blank"
        />
      </section>
    </div>
  </header>
)
