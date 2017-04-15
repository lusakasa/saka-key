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
  renameProfile = () => {
    this.setState({ state: 'editing', menuVisible: false });
    setTimeout(() => {
      this.profileNameInput.focus();
    }, 0);
  }
  duplicateProfile = () => {
    this.setState({ menuVisible: false });

  }
  newProfile = () => {
    this.setState({ menuVisible: false });
    this.props.onProfileNew('unnamed' + Date.now());
  }
  deleteProfile = () => {
    this.setState({ menuVisible: false });
    this.props.onProfileDelete(this.props.selectedProfile);
  }
  render ({
    name, profiles, selectedProfile,
    onProfileChange, onProfileRename, onProfileDelete, onProfileDuplicate
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
                ref={(el) => { this.profileNameInput = el; }}
                type='text'
                className='mdc-textfield__input mode-card-select'
                value={selectedProfile}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    if (profiles.indexOf(e.target.value) === -1) {

                    } else {

                    }
                    this.setState({ state: 'default' });
                  }
                }}
              />
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
                <li
                  className='mdc-list-item'
                  role='menuitem'
                  tabIndex='0'
                  onClick={this.renameProfile}
                >
                  Rename
                </li>
                <li
                  className='mdc-list-item'
                  role='menuitem'
                  tabIndex='0'
                  onClick={this.duplicateProfile}
                >
                  Duplicate
                </li>
                <li
                  className='mdc-list-item'
                  role='menuitem'
                  tabIndex='0'
                  onClick={this.newProfile}
                >
                  New
                </li>
                { selectedProfile === 'standard'
                  ? undefined
                  : <li
                    className='mdc-list-item'
                    role='menuitem'
                    tabIndex='0'
                    style={{color: 'red'}}
                    onClick={this.deleteProfile}
                  >
                    Delete
                  </li> }
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
