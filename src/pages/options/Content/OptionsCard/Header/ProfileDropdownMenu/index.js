import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import DropdownItem from './DropdownItem'
import {
  newProfile,
  duplicateProfile,
  deleteProfile
} from 'pages/options/actions'

class ProfileDropdownMenu extends Component {
  state = {
    visible: false
  }
  render ({
    category,
    isBuiltInProfile,
    setIsEditingName,
    newProfile,
    duplicateProfile,
    deleteProfile
  }) {
    return (
      <div
        id={`dropdownmenu_${category}`}
        className='mdc-menu-anchor'
        style='margin: 0px 10px'
      >
        <button
          className='mdc-button mode-card-settings-button'
          onClick={() => this.setState({ visible: !this.state.visible })}
        >
          &#8942;
        </button>

        <div
          className={`mdc-simple-menu settings-card-menu ${this.state.visible
            ? 'mdc-simple-menu--open'
            : ''}`}
          tabIndex='0'
        >
          <ul
            className='mdc-simple-menu__items mdc-list'
            role='menu'
            aria-hidden='true'
          >
            <DropdownItem
              label='New'
              onClick={this.hideMenuAndStartEditingNameThen(newProfile)}
            />
            <DropdownItem
              label='Duplicate'
              onClick={this.hideMenuAndStartEditingNameThen(duplicateProfile)}
            />
            {isBuiltInProfile ? (
              undefined
            ) : (
              <DropdownItem
                label='Rename'
                onClick={this.hideMenuThen(() => setIsEditingName(true))}
              />
            )}
            {isBuiltInProfile ? (
              undefined
            ) : (
              <DropdownItem
                label='Delete'
                onClick={this.hideMenuThen(deleteProfile)}
                color='red'
              />
            )}
          </ul>
        </div>
      </div>
    )
  }
  hideMenuThen = fn => () => {
    this.setState({ visible: false })
    fn()
  }
  hideMenuAndStartEditingNameThen = fn => () => {
    this.setState({ visible: false })
    fn()
    this.props.setIsEditingName(true)
  }
  componentDidMount () {
    document.addEventListener('click', e => {
      if (
        this.state.visible &&
        !document
          .querySelector(`#dropdownmenu_${this.props.category}`)
          .contains(e.target)
      ) {
        this.setState({ visible: false })
      }
    })
  }
}

const mapDispatchToProps = (dispatch, { category, activeProfile }) => ({
  newProfile: () => dispatch(newProfile(category, `unnamed_${Date.now()}`)),
  duplicateProfile: () =>
    dispatch(
      duplicateProfile(
        category,
        `${activeProfile}_copy_${Date.now()}`,
        activeProfile
      )
    ),
  deleteProfile: () => dispatch(deleteProfile(category, activeProfile))
})

export default connect(null, mapDispatchToProps)(ProfileDropdownMenu)
