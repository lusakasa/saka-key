import { Component, h } from 'preact'

export default class Header extends Component {
  render({ label }) {
    return (
      <li>
        {/* <hr class='mdc-list-divider' /> */}
        <h3 className="mdc-typography--subheading1" style="font-weight: 600">
          {label}
        </h3>
      </li>
    )
  }
}
