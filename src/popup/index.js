import { render, Component, h } from 'preact';
import { init, msg } from 'mosi/client';
import './style.css';
import '@material/button/dist/mdc.button.css';

class Popup extends Component {
  componentDidMount () {
    init({
      subscriptions: ['popup'],
      onConnect: [{ action: 'getEnabled' }],
      actions: {
        setEnabled: (enabled) => {
          this.setState({ enabled });
        }
      }
    });
  }
  toggleEnabled () {
    msg(1, 'toggleEnabled');
  }
  render () {
    return (
      <div className='container'>
        { this.state.enabled
          ? (<button onClick={this.toggleEnabled} className='mdc-button mdc-button--accent disable-button'>Disable Saka Key</button>)
          : (<button onClick={this.toggleEnabled} className='mdc-button mdc-button--accent enable-button'>Enable Saka Key</button>) }
      </div>
    );
  }
}


render(<Popup />, document.body);
