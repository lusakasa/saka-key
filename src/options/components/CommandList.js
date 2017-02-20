import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import CommandEntry from './CommandEntry';

class CommandList extends Component {
  render ({ commands, commandDetails }) {
    return (
      <ul className='mdc-list mdc-list--dense'>
        { commands.map((command) =>
          <CommandEntry command={command} {...commandDetails[command]} />) }
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  commandDetails: state.commandDetails
});

export default connect(mapStateToProps)(CommandList);
