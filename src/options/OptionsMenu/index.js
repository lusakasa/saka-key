import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import OptionsMenuHeader from './OptionsMenuHeader';
import OptionsMenuContent from './OptionsMenuContent';

import 'material-components-web/dist/material-components-web.min.css';
import '../style.css';

class OptionsMenu extends Component {

  render ({ view }) {
    return (
      <div className={'options-menu'}>
        <OptionsMenuHeader view={view} />
        <main className='mdc-toolbar-fixed-adjust'>
          <OptionsMenuContent view={view} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ view: state.view });
export default connect(mapStateToProps)(OptionsMenu);
