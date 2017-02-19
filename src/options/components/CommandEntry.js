import { Component, h } from 'preact';

function readableCommand (command) {
  return command.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}

export default class CommandEntry extends Component {
  render ({ command, description, default_bindings }) {
    return (
      <div>
        <h3>{ readableCommand(command) }</h3>
        <p>{ description }</p>
        { default_bindings.map((b) =>
          <p>{ b }</p>) }
      </div>
    );
  }
}
