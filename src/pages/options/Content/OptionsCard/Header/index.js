import { Component, h } from 'preact'
import ProfileDropdownMenu from './ProfileDropdownMenu'
import ProfileSelect from './ProfileSelect'
import ProfileNameInput from './ProfileNameInput'
import './style.css'

export default class Header extends Component {
  state = {
    isEditingName: false
  }
  render (props) {
    const { isEditingName } = this.state
    return (
      <header className='mdc-toolbar saka-toolbar settings-header'>
        <div class='mdc-toolbar__row'>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
            <span className='mdc-toolbar__title'>{props.category}</span>
          </section>
          {/* align-items: center is a firefox fix */}
          <section
            className='mdc-toolbar__section mdc-toolbar__section--align-end'
            style='align-items: center'
          >
            {isEditingName ? (
              <ProfileNameInput
                {...props}
                setIsEditingName={this.setIsEditingName}
              />
            ) : (
              <ProfileSelect
                {...props}
                setIsEditingName={this.setIsEditingName}
              />
            )}
            <ProfileDropdownMenu
              {...props}
              setIsEditingName={this.setIsEditingName}
            />
          </section>
        </div>
      </header>
    )
  }
  setIsEditingName = isEditingName => {
    this.setState({ isEditingName })
  }
}
