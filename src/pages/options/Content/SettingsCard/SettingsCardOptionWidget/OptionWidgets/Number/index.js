import { Component, h } from 'preact';
import SettingsCardErrorWidget from '../../../SettingsCardErrorWidget';
import './style.css';

// TODO: make this an intelligent error checking component
// so that error checking doesn't have to be done in background page.

export default class Number extends Component {
  _onChange = (e) => {
    this.props.onChange(parseFloat(e.target.value));
  }
  render ({ label, key, value, step, min, max }) {
    const optionalProps = { step, min, max };
    const v = parseFloat(value);
    const isNotNumber = isNaN(v);
    const badMin = min !== undefined && v < min;
    const badMax = max !== undefined && v > max;
    const invalidValue = isNotNumber || badMin || badMax;
    return (
      <div>
        {invalidValue
          ? <SettingsCardErrorWidget message={
            `${label} must be${
              isNotNumber ? ' a number' : ''
            }${
              badMin ? ` greater than ${min}` : ''
            }${
              (badMin && badMax) ? ' and' : ''
            }${
              badMax ? ` less than ${max}` : ''
            }`
          } />
          : undefined
        }
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
