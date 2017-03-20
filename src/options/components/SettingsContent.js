import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import ModeCard from './ModeCard';
import { loadModesSettings } from '../actions';

class SettingsContent extends Component {
  constructor (props) {
    super(props);
    chrome.storage.local.get('modesConfig', ({ modesConfig }) => {
      props.dispatch(loadModesSettings(modesConfig));
    });
  }
  render ({ modes }) {
    console.log('render', modes);
    return (
      <main className='settings-content'>
        { modes.map((mode) => (
          <ModeCard {...mode} />
        )) }
      </main>
    );
  }
}

const mapStateToProps = ({ modes }) => ({ modes });
export default connect(mapStateToProps)(SettingsContent);
