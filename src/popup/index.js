import { render, Component, h } from 'preact';
import { init, msg } from 'mosi/client';
import './style.css';
import '@material/button/dist/mdc.button.css';

class Popup extends Component {
  componentDidMount () {
    init({
      subscriptions: ['popup'],
      onConnect: [{ action: 'modeAction', arg: { mode: 'BASIC', action: 'getEnabled' } }],
      actions: {
        setEnabled: (enabled) => {
          this.setState({ enabled });
        }
      }
    });
  }
  toggleEnabled () {
    msg(1, 'modeAction', {
      mode: 'BASIC',
      action: 'toggleEnabled'
    });
  }
  toggleHelpMenu () {
    msg(1, 'modeAction', {
      mode: 'BASIC',
      action: 'toggleHelpMenu'
    });
  }
  showOptionsPage () {

  }
  render () {
    return (
      <div className='container'>
        { this.state.enabled
          ? (<button onClick={this.toggleEnabled} className='mdc-button mdc-button--accent'>Disable Saka Key</button>)
          : (<button onClick={this.toggleEnabled} className='mdc-button mdc-button--accent'>Enable Saka Key</button>) }
        <button onClick={this.toggleHelpMenu} className='mdc-button mdc-button--accent'>Help</button>
        <button onClick={this.showOptionsPage} className='mdc-button mdc-button--accent'>Options</button>
        <button onClick={this.showOptionsPage} className='mdc-button mdc-button--accent'>{ 'VERSION ' + SAKA_VERSION }</button>
      </div>
    );
  }
}


render(<Popup />, document.body);
