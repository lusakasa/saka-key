import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import OptionsMenuHeader from './OptionsMenuHeader';
import OptionsMenuContent from './OptionsMenuContent';

import '@material/button/dist/mdc.button.css';
import '@material/list/dist/mdc.list.css';
import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/typography/dist/mdc.typography.css';
import '@material/card/dist/mdc.card.css';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/elevation/dist/mdc.elevation.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/checkbox/dist/mdc.checkbox.css';
import '@material/switch/dist/mdc.switch.css';
import '../style.css';

class OptionsMenu extends Component {

  render ({ view }) {
    return (
      <div className={'options-menu'}>
        <OptionsMenuHeader view={view} />
        <main className='mdc-toolbar-fixed-adjust main-container'>
          <OptionsMenuContent view={view} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ view: state.view });
export default connect(mapStateToProps)(OptionsMenu);
