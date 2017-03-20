import { Component, h } from 'preact';

export default class Header extends Component {
  render ({ header }) {
    return (
      <div>
        <h2
          className='mdc-typography--title'>
          { header }
        </h2>
      </div>
    );
  }
}
