import { Component, h } from 'preact';

export default class TextArea extends Component {
  render ({ label, key, value }) {
    return (
      <li id='mdc-list-item color-widget demo-textfield-multiline-wrapper'>
        <label style='display: flex;'>{label}</label>
        <div
          class='mdc-textfield mdc-textfield--multiline mdc-textfield--upgraded'
          style='flex-direction: column; height: auto; align-items: flex-start;'>
          <textarea id='multi-line' class='mdc-textfield__input' rows='8' cols='40'
            value={value} />
        </div>
      </li>
    );
  }
}
