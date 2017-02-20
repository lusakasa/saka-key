import { Component, h } from 'preact';
import { connect } from 'preact-redux';

class KeyBindingItem extends Component {
  render ({ keys }) {
    return (
      <span>
        { keys.map((key) =>
          <span className={'key-text mdc-typography--body1'}>
            {key}
          </span>) }
      </span>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(KeyBindingItem);
