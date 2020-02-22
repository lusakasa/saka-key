import { Component, h } from 'preact'

import './style.css'

export default class TextArea extends Component {
  render ({ label, key, value, onChange }) {
    return (
      <li id='mdc-list-item color-widget demo-textfield-multiline-wrapper'>
        <label style='display: flex;'>{label}</label>
        <div
          className='mdc-textfield mdc-textfield--multiline mdc-textfield--upgraded textarea-widget-container'
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: 'auto'
          }}
        >
          <textarea
            id='multi-line'
            className='mdc-textfield__input'
            rows={value.split('\n').length + 3}
            cols='40'
            value={value}
            onChange={e => onChange(e.target.value)}
          />
        </div>
      </li>
    )
  }
}
