import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import './style.css';

const scrollToCard = (name) => () => {
  const scrollTarget = document.querySelector(`#settings_card_${name}`);
  const newScrollTop = scrollTarget.getBoundingClientRect().top + pageYOffset - 84;
  document.scrollingElement.scrollTop = newScrollTop;
};

class SettingsDrawer extends Component {
  state = {
     // the first card for which its bottom is below the viewport top
    activeCard: 'Profiles'
  }
  componentDidMount () {
    document.addEventListener('scroll', (event) => {
      const cardNames = ['Profiles', ...this.props.modes];
      const cardBottoms = cardNames.map((name) =>
        document.querySelector(`#settings_card_${name}`)
          .getBoundingClientRect().bottom + pageYOffset
      );
      const activeCardIndex = cardBottoms.findIndex((bottom) =>
        bottom > document.scrollingElement.scrollTop + 84
      );
      this.setState({ activeCard: cardNames[activeCardIndex] });
    });
  }
  calculateLinkColor = (cardName) => {
    return cardName === this.state.activeCard
      ? '#3f51b5'
      : '#000000';
  }
  render ({ modes }) {
    return (
      <nav class='mdc-permanent-drawer'>
        <div class='mdc-list-group'>
          <a
            class='mdc-list-item settings-drawer-link'
            style={{ color: this.calculateLinkColor('Profiles') }}
            onClick={scrollToCard('Profiles')}
          >
            Profiles
          </a>
          <hr class='mdc-list-divider' />
          <nav class='mdc-list'>
            { modes.map((name) =>
              <a
                class='mdc-list-item settings-drawer-link'
                style={{ color: this.calculateLinkColor(name) }}
                onClick={scrollToCard(name)}
              >
                { name }
              </a>
            )}
          </nav>
          {/* <div class='mdc-permanent-drawer__toolbar-spacer' /> */}
          {/*<nav class='mdc-list'>
            <a class='mdc-list-item mdc-permanent-drawer--selected' href='#'>Enable Profile</a>
            <a class='mdc-list-item mdc-permanent-drawer--selected' href='#'>Share Profile</a>
            <a class='mdc-list-item mdc-permanent-drawer--selected' href='#'>Delete Profile</a>
            <a class='mdc-list-item mdc-permanent-drawer--selected' href='#'>GUI Configuration</a>
            <a class='mdc-list-item mdc-permanent-drawer--selected' href='#'>Text Configuration</a>
          </nav>*/}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ modes }) => ({
  modes: modes ? modes.map((mode) => mode.name) : []
});
export default connect(mapStateToProps)(SettingsDrawer);
