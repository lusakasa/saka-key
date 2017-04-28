import { Component, h } from 'preact';
import './style.css';

// TODO: make this an intelligent error checking component
// so that error checking doesn't have to be done in background page.

/*const ErrorMessage = ({ message }) => (
  <li>
    <h3
      className='mdc-typography--subheading1'
      style={{
        fontWeight: '100',
        color: 'red'
      }}
    >
      { message }
    </h3>
  </li>
);*/

export default class Number extends Component {
  _onChange = (e) => {
    this.props.onChange(e.target.value);
  }
  render ({ label, key, value, step, min, max }) {
    const optionalProps = { step, min, max };
    return (
      <div>
        {/*<ErrorMessage />*/}
        <li className='mdc-list-item number-widget-li'>
          <label>{ label }</label>
          <div className='mdc-textfield' data-demo-no-auto-js=''>
            <input
              type='number'
              {...optionalProps}
              className='mdc-textfield__input'
              style='text-align: right'
              value={value}
              onChange={this._onChange} />
          </div>
        </li>
      </div>
    );
  }
}
