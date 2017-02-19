import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import { store } from '../reducers';
import { initConfig } from '../actions';
import CategoryHeader from './CategoryHeader';
import CommandList from './CommandList';

class CommandMenu extends Component {
  componentDidMount () {
    fetch(chrome.extension.getURL('/config.json'))
      .then((response) => response.json())
      .then((config) => {
        console.log(config);
        store.dispatch(initConfig(config));
      });
  }
  render ({ loaded, commandCategories }) {
    if (loaded) {
      return (
        <div>
          { Object.keys(commandCategories).map((category) =>
            <div>
              <CategoryHeader category={category} />
              <CommandList commands={commandCategories[category]} />
            </div>) }
        </div>
      );
    } else {
      return (
        <div>
          <span>Not loaded yet</span>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  loaded: state.loaded,
  commandCategories: state.commandCategories
});

export default connect(mapStateToProps)(CommandMenu);
