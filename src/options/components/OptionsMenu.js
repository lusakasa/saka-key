import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import SettingsMenu from './SettingsMenu';
import About from './About';
import Tutorial from './Tutorial';
import { setView } from '../actions';

import '@material/button/dist/mdc.button.css';
import '@material/list/dist/mdc.list.css';
import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/typography/dist/mdc.typography.css';
import '@material/card/dist/mdc.card.css';
import '../style.css';

class OptionsMenu extends Component {

  render ({ view, setView }) {
    return (
      <div className={'options-menu'}>
        <header className='mdc-toolbar mdc-toolbar--fixed saka-toolbar'>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
            <img src='logo.png' className='saka-logo' alt='Saka Key' />
            <span className='mdc-toolbar__title'>Saka Key</span>
          </section>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-end'>
            <a
              className={`mdc-typography--subheading2 saka-toolbar-item ${
                view === 'settings' ? 'saka-toolbar-item__active' : ''}`}
              onClick={setView('settings')}> Settings </a>
            <a
              className={`mdc-typography--subheading2 saka-toolbar-item ${
                view === 'tutorial' ? 'saka-toolbar-item__active' : ''}`}
              onClick={setView('tutorial')}> Tutorial </a>
            <a
              className={`mdc-typography--subheading2 saka-toolbar-item ${
                view === 'about' ? 'saka-toolbar-item__active' : ''}`}
              onClick={setView('about')}> About </a>
          </section>
        </header>
        <main className='mdc-toolbar-fixed-adjust main-container'>
          { (() => {
            switch (view) {
              case 'settings':
                return <SettingsMenu />;
              case 'tutorial':
                return <Tutorial />;
              case 'about':
              default:
                return <About />;
            }
          })() }
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ view: state.view });
const mapDispatchToProps = (dispatch) => ({
  setView: (view) => () => { console.log(view); dispatch(setView(view)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsMenu);
