import { Component, h } from 'preact';

export default class Header extends Component {
  render ({ header }) {
    return (
      <li>
        <hr class='mdc-list-divider' />
        <h3 className='mdc-typography--subheading1'>
          { header }
        </h3>
      </li>
    );
  }
}
