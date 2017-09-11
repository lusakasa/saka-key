import { Component, h } from 'preact'
import './style.css'

export default class SettingsCardErrorWidget extends Component {
  render ({ message }) {
    return (
      <li>
        <h3 className='mdc-typography--subheading1 error-widget-text'>
          {message}
        </h3>
      </li>
    )
  }
}
