// must import h or build will break for some reason
import { render, h, Component } from 'preact';

function readableCommand (command) {
  return command.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}

class Header extends Component {
  render () {
    return <h1>SakaVim</h1>;
  }
}

class Commands extends Component {
  componentDidMount () {
    fetch(chrome.extension.getURL('/config.json'))
      .then((response) => response.json())
      .then((config) => {
        this.setState({ config, loaded: true });
      });
  }
  render ({ commands }) {
    if (this.state.loaded) {
      return (
        <div>
          <ul>
          { Object.keys(this.state.config.commands).map((command) =>
            <li> { readableCommand(command) } </li>)
          }
          </ul>
        </div>
      );
    }
    return (
      <div>
        <span>Not loaded yet</span>
      </div>
    );
  }
}

class OptionsPage extends Component {
  render () {
    return (
      <div>
        <Header />
        <Commands />
      </div>
    );
  }
}

render(<OptionsPage />, document.body);
