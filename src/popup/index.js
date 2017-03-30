import { render, Component, h } from 'preact';
import { msg } from 'mosi/client';
import { initialize } from 'client';
import './style.css';
import '@material/button/dist/mdc.button.css';

if (SAKA_PLATFORM === 'chrome') {
  require('webextension-polyfill/dist/browser-polyfill');
}

initialize('popup');

class Popup extends Component {
  componentDidMount () {
    // init({
    //   subscriptions: ['popup'],
    //   onConnect: [{ action: 'modeAction', arg: { mode: 'Basic', action: 'getEnabled' } }],
    //   actions: {
    //     setEnabled: (enabled) => {
    //       this.setState({ enabled });
    //     }
    //   }
    // });
  }
  toggleEnabled () {
    msg(1, 'modeAction', {
      mode: 'Basic',
      action: 'toggleEnabled'
    });
  }
  toggleHelpMenu () {
    msg(1, 'modeAction', {
      mode: 'Basic',
      action: 'toggleHelpMenu'
    });
  }
  render () {
    return (
      <div className='container'>
        { this.state.enabled
          ? (<button onClick={this.toggleEnabled} className='mdc-button mdc-button--accent'>Disable Saka Key</button>)
          : (<button onClick={this.toggleEnabled} className='mdc-button mdc-button--accent'>Enable Saka Key</button>) }
        <button onClick={this.toggleHelpMenu} className='mdc-button mdc-button--accent'>Help</button>
        <a href={chrome.runtime.getURL('options.html')} className='mdc-button mdc-button--accent'>Options</a>
        <button onClick={this.showOptionsPage} className='mdc-button mdc-button--accent'>{ 'VERSION ' + SAKA_VERSION }</button>
      </div>
    );
  }
}


render(<Popup />, document.body);
