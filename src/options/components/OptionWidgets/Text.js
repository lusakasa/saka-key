import { Component, h } from 'preact';

export default class Text extends Component {
  render ({ label, key }) {
    return (
      <li className='mdc-list-item color-widget'>
        <label>{ label }</label>
        <div class='mdc-textfield' data-demo-no-auto-js=''>
          <input
            type='text'
            class='mdc-textfield__input'
            style='text-align: right'
            id='css-only-textfield' />
        </div>
      </li>
    );
  }
}
