import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import {
  storeageImportProcedure,
  storageExportProcedure,
  storageResetProcedure
} from 'options/procedures';
import './style.css';

const scrollToCard = (name) => () => {
  const scrollTarget = document.querySelector(`#settings_card_${name}`);
  const newScrollTop = scrollTarget.getBoundingClientRect().top + pageYOffset - 84;
  document.scrollingElement.scrollTop = newScrollTop;
};

const ActionButton = ({ label, onClick }) => (
  <a
    class='mdc-list-item settings-drawer-link'
    style={{ color: 'black' }}
    onClick={onClick}
  >
    { label }
  </a>
);

class Drawer extends Component {
  state = {
     // the first card for which its bottom is below the viewport top
    activeCard: SAKA_PLATFORM !== 'firefox' ? 'General' : ''
  }
  componentDidMount () {
    if (SAKA_PLATFORM !== 'firefox') {
      document.addEventListener('scroll', (event) => {
        const { categories } = this.props;
        const cardBottoms = categories.map((category) =>
          document.querySelector(`#settings_card_${category}`)
            .getBoundingClientRect().bottom + pageYOffset
        );
        const activeCardIndex = cardBottoms.findIndex((bottom) =>
          bottom > document.scrollingElement.scrollTop + 84
        );
        this.setState({ activeCard: categories[activeCardIndex] });
      });
    }
  }
  calculateLinkColor = (cardName) => {
    return cardName === this.state.activeCard
      ? '#3f51b5'
      : '#000000';
  }
  render ({ categories }) {
    return (
      <div
        class='mdc-card'
        style={{
          margin: '20px 20px',
          position: 'fixed',
          overflowY: 'scroll'
        }}
      >
        <nav class='mdc-permanent-drawer'>
          <div class='mdc-list-group'>
            <nav class='mdc-list'>
              { categories.map((category) =>
                <a
                  class='mdc-list-item settings-drawer-link'
                  style={{ color: this.calculateLinkColor(category) }}
                  onClick={scrollToCard(category)}
                >
                  { category }
                </a>
              )}
              <div role='separator' class='mdc-list-divider' style={{ margin: '20px' }} />
              <ActionButton label={'Import Options from File'} onClick={storeageImportProcedure} />
              <ActionButton label={'Export Options To File'} onClick={storageExportProcedure} />
              <ActionButton label={'Reset All Options'} onClick={storageResetProcedure} />
            </nav>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
export default connect(mapStateToProps)(Drawer);
