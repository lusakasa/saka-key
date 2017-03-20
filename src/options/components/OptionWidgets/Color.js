import { Component, h } from 'preact';

export default class Color extends Component {
  render ({ label, key }) {
    return (
      <div>
        <label>{ label }</label>
        <input type='color' />
      </div>
    );
  }
}
