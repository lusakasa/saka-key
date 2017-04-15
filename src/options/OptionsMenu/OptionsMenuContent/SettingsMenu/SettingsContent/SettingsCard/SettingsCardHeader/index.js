import { Component, h } from 'preact';

export default class SettingsCardHeader extends Component {
  state = {
    menuVisible: false,
    state: 'default' // 'editing'
  }
  menuClasses = () => {
    const menuVisibleClass = this.state.menuVisible ? 'mdc-simple-menu--open' : '';
    return `mdc-simple-menu settings-card-menu ${menuVisibleClass}`;
  }
  toggleMenuVisibility = () => {
    this.setState({ menuVisible: !this.state.menuVisible });
  }
  clickRename = (name) => () => {
    this.setState({ state: 'editing' });
    setTimeout(() => {
      document.querySelector(`#name-text-input-${name}`).focus();
    }, 0);
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
              onClick={this.toggleMenuVisibility}>
              &#8942;
            </button>
            <div className={this.menuClasses()} tabIndex='0'>
              <ul className='mdc-simple-menu__items mdc-list' role='menu' aria-hidden='true'>
                <li className='mdc-list-item' role='menuitem' tabIndex='0'
                  onClick={this.clickRename(name)}
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
