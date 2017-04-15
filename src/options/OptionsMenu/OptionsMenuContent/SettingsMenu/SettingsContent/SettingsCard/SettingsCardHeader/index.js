import { Component, h } from 'preact';
import { MDCSimpleMenu } from '@material/menu';

export default class SettingsCardHeader extends Component {
  state = {
    state: 'default' // 'editing'
  }
  clickRename = () => {
    this.setState({ state: 'editing' });
    setTimeout(() => {
      this.textInput.focus();
    }, 100);
  }
  render ({
    name, profiles, selectedProfile,
    onProfileChange, onProfileRename, onProfileDelete, onProfileNew, onProfileDuplicate
  }) {
    return (
      <header className='mdc-toolbar saka-toolbar settings-header'>
        <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
          <span className='mdc-toolbar__title'>{ name }</span>
        </section>
        <section className='mdc-toolbar__section mdc-toolbar__section--align-end'>
          { this.state.state === 'default'
            ? <select
              className='mdc-select mode-card-select'
              value={selectedProfile}
              onChange={this._handleChange} >
              { profiles.map((profile) =>
                <option value={profile}>{profile}</option>
              )}
            </select>
            : <div className='mdc-textfield' style='margin-bottom: 0px' data-demo-no-auto-js=''>
              <input
                ref={(el) => { this.textInput = el; }}
                id={`name-text-input-${name}`}
                type='text'
                className='mdc-textfield__input mode-card-select'
                value={'meow'}
                onChange={(e) => {}} />
            </div>
          }
          <div class='mdc-menu-anchor'>
            <button
              className='mdc-button mode-card-settings-button'
              onClick={() => { this.menu.open = !this.menu.open; }}>
              &#8942;
            </button>
            <div
              className='mdc-simple-menu mdc-simple-menu--open-from-top-right settings-card-menu' tabIndex='0'
              ref={(el) => {
                if (el) this.menu = new MDCSimpleMenu(el);
              }}
            >
              <ul className='mdc-simple-menu__items mdc-list' role='menu' aria-hidden='true'>
                <li className='mdc-list-item' role='menuitem' tabIndex='0'
                  onClick={this.clickRename}
                >
                  Rename
                </li>
                <li className='mdc-list-item' role='menuitem' tabIndex='0'
                >
                  Duplicate
                </li>
                <li className='mdc-list-item' role='menuitem' tabIndex='0'>
                  New
                </li>
                <li className='mdc-list-item' role='menuitem' tabIndex='0' style={{color: 'red'}}>
                  Delete
                </li>
              </ul>
            </div>
          </div>
        </section>
      </header>
    );
  }
  _handleChange = (e) => {
    this.props.onProfileChange(e.target.value);
  }
}
