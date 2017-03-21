import { Component, h } from 'preact';

export default class Color extends Component {
  render ({ label, key }) {
    return (
      <li className='mdc-list-item color-widget'>
        <label>{ label }</label>
        <input type='color' />
      </li>
    );
  }
}
