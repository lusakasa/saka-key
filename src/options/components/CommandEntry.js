import { Component, h } from 'preact';
import KeyBindingsMenu from './KeyBindingsMenu';
import '@material/button/dist/mdc.button.css';
import '@material/list/dist/mdc.list.css';

function readableCommand (command) {
  return command.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}

export default class CommandEntry extends Component {
  render ({ command, description, defaultBindings }) {
    return (
      <li className='mdc-list-item command-entry'>
        <button className='mdc-button mdc-button--accent mdc-button--dense command-entry-button'>
          { readableCommand(command) }
        </button>
        <KeyBindingsMenu command={command} defaultBindings={defaultBindings} />
      </li>
    );
  }
}
