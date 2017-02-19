import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import CommandEntry from './CommandEntry';

class CommandList extends Component {
  render ({ commands, commandDetails }) {
    return (
      <div>
        { commands.map((command) =>
          <CommandEntry command={command} {...commandDetails[command]} />) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  commandDetails: state.commandDetails
});

export default connect(mapStateToProps)(CommandList);
