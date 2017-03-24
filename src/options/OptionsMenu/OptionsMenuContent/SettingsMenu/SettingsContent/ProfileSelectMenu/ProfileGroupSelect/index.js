import { h, Component } from 'preact';
import update from 'immutability-helper';
import './style.css';
import '@material/list/dist/mdc.list.css';
import '@material/select/dist/mdc.select.css';
import '@material/typography/dist/mdc.typography.css';

// Actions:
// 1. Change the active ProfileGroup (from GUI)
// 2. Create a new ProfileGroup (from GUI)
// 3. Delete a ProfileGroup, potentially the active one (from GUI)
// 4. Change the profile for a given mode for the active ProfileGroup
// 5. Reorder ProfileGroups
// 6. Reorder Profiles
// External Changes:
// 1. User deletes a Profile used by a ProfileGroup
// 2. User adds new profile
// 3. User changes profile settings
// FUTURE:
// 1. Support Deleting profile from ProfileGroupSelector
// 2. Support Adding profile from ProfileGroupSelector (possibly redirecting to selector)
// 3. Support editing profile from ProfileGroupSelector (possibly with overlay)

// What it might look like normalized
// const testSettings = {
//   ProfileGroups: {
//     items: ['0', '1', '2', '3'],
//     selected: '1'
//   },
//   Profiles: [
//     {
//       mode: 'Basic',
//       items: ['0', '1'],
//       selected: '0'
//     },
//     {
//       mode: 'Command',
//       items: ['2', '3', '4', '5', '6'],
//       selected: '1'
//     },
//     {
//       mode: 'Hint',
//       items: ['standard', 'left hand', 'right hand', 'full keyboard', 'home row'],
//       selected: 'left hand'
//     },
//     {
//       mode: 'Text',
//       items: ['standard'],
//       selected: 'standard'
//     },
//     {
//       mode: 'Voice',
//       items: ['standard', 'disabled'],
//       selected: 'standard'
//     }
//   ],
//   ProfileGroupSettings: {
//     '0': {
//       name: 'standard'
//     },
//     '1': {
//       name: 'left hand'
//     },
//     '2': {
//       name: 'right hand'
//     },
//     '3': {
//       name: 'vimium'
//     }
//   },
//   ProfileSettings: {
//     '0': {
//       mode: 'Basic',
//       name: 'standard',
//       settings: {}
//     }
//   }
// };

const testSettings = {
  ProfileGroups: {
    header: 'Profiles',
    items: ['standard', 'left hand', 'right hand', 'vimium'],
    selected: 'left hand'
  },
  Profiles: [
    {
      header: 'Basic',
      items: ['standard', 'funny colors'],
      selected: 'standard'
    },
    {
      header: 'Command',
      items: ['standard', 'left hand', 'right hand', 'vimium', 'disabled'],
      selected: 'left hand'
    },
    {
      header: 'Hint',
      items: ['standard', 'left hand', 'right hand', 'full keyboard', 'home row'],
      selected: 'left hand'
    },
    {
      header: 'Text',
      items: ['standard'],
      selected: 'standard'
    },
    {
      header: 'Voice',
      items: ['standard', 'disabled'],
      selected: 'standard'
    }
  ]
};

// Inputs:
// * settings (see storageFormat.js)
// Events:
// * onProfileGroupAdd((new) => {})
// * onProfileGroupDelete((deleted) => {})
// * onProfileGroupChange((old, new) => {})
// x* onProfileChange((profile, old, new) => {})
// Future:
// * onProfileDelete((deleted) => {})
// * ...

const SelectItem = ({ name, selected, onSelect }) =>
  <li
    className='mdc-list-item mdc-typography--subheading1 pg-row-list-item'
    style={{color: name === selected ? 'green' : 'inherit'}}
    onClick={() => onSelect(selected, name)}>
    {name}
  </li>;

/*const SelectRow = ({ header, items, selected, onSelect }) => {
  return (
    <div className='pg-row-container'>
      <h1 className='pg-row-header'>{header}</h1>
      <ul className='pg-row-list'>
        { items.map((name) =>
          <SelectItem name={name} selected={selected} onSelect={onSelect} />) }
      </ul>
    </div>
  );
};*/

class ItemAdder extends Component {
  constructor () {
    super();
    this.state = { active: false };
  }
  render () {
    return this.state.active
    ? (
      <input
        ref={(input) => { this.input = input; }}
        id='pg_input'
        onBlur={this._deactivate}
        onKeyPress={this._onKeyPress} />
    ) : (
      <button
        className='mdc-button mdc-button--raised mdc-button--accent mdc-ripple-upgraded'
        onClick={this._activate}>+</button>
    );
  }
  _activate = () => {
    this.setState({ active: true });
    setTimeout(() => this.input.focus(), 0);
  }
  _deactivate = () => { this.setState({ active: false }); }
  _onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.onAdded(this.input.value);
      this._deactivate();
    }
  }
}

class ProfileGroupSelectRow extends Component {
  render ({ header, items, selected, onSelect, onProfileGroupChange, onCreateProfileGroup }) {
    return (
      <div className='pg-row-container'>
        <h1 className='pg-row-header'>{header}</h1>
        <ul className='pg-row-list'>
          { items.map((name) =>
            <SelectItem name={name} selected={selected} onSelect={onProfileGroupChange} />) }
        </ul>
        <ItemAdder onAdded={onCreateProfileGroup} />
      </div>
    );
  }
}

export default class ProfileSelectRow extends Component {
  render ({ header, items, selected, onSelect, onProfileGroupChange }) {
    return (
      <div className='pg-row-container'>
        <h1 className='pg-row-header'>{header}</h1>
        <ul className='pg-row-list'>
          { items.map((name) =>
            <SelectItem name={name} selected={selected} onSelect={this._onProfileChange} />) }
        </ul>
      </div>
    );
  }
  _onProfileChange = (prev, next) => this.props.onProfileChange(this.props.header, prev, next)
}

class ProfileGroupSelect extends Component {
  render ({ settings: { ProfileGroups, Profiles },
    onProfileGroupChange, onProfileChange, onCreateProfileGroup }) {
    return (
      <div className='pg-container'>
        <ProfileGroupSelectRow {...ProfileGroups}
          onProfileGroupChange={onProfileGroupChange}
          onCreateProfileGroup={onCreateProfileGroup} />
        { Profiles.map((profile) =>
          <ProfileSelectRow {...profile} onProfileChange={onProfileChange} />) }
      </div>
    );
  }
}

export class ProfileGroupSelectTest extends Component {
  constructor () {
    super();
    this.state.settings = testSettings;
  }
  _onProfileChange = (modeName, prev, next) => {
    console.log(`mode: ${modeName}, prev: ${prev}, next: ${next}`);
    const modeIndex = this.state.settings.Profiles.findIndex((profile) => profile.header === modeName);
    // const mode = this.state.settings.Profiles[modeIndex];
    // const oldIndex = mode.items.findIndex((item) => item === prev);
    // const newIndex = mode.items.findIndex((item) => item === next);
    const newSettings = update(this.state.settings, { Profiles: { [modeIndex]: { selected: {
      $set: next
    } } } });
    this.setState({ settings: newSettings });
  }
  _onProfileGroupChange = (prev, next) => {
    console.log(`prev: ${prev}, next: ${next}`);
    const newSettings = update(this.state.settings, { ProfileGroups: { selected: { $set: next } } });
    this.setState({ settings: newSettings });
  }
  _onCreateProfileGroup = (name) => {
    console.log(`New Profile Group: ${name}`);
    const newSettings = update(this.state.settings, { ProfileGroups: { items: { $push: [name] } } });
    this.setState({ settings: newSettings });
  }
  render () {
    return (
      <ProfileGroupSelect
        settings={this.state.settings}
        onProfileGroupChange={this._onProfileGroupChange}
        onProfileChange={this._onProfileChange}
        onCreateProfileGroup={this._onCreateProfileGroup} />
    );
  }
}
