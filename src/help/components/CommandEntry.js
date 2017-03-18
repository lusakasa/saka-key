import { Component, h } from 'preact';
import KeyBindingsMenu from './KeyBindingsMenu';

function readableCommand (command) {
  return command.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}

export default class CommandEntry extends Component {
  render ({ command, bindings }) {
    return (
      <li className='mdc-list-item command-entry'>
        <button className='mdc-button mdc-button--accent mdc-button--dense command-entry-button'>
          { readableCommand(command) }
        </button>
        <KeyBindingsMenu command={command} bindings={bindings} />
      </li>
    );
  }
}
