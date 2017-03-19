import { h } from 'preact';
import { setView } from '../actions';
import { connect } from 'preact-redux';

const OptionsMenuTab = ({ name, view, setView }) => (
  <a
    className={`mdc-typography--subheading2 saka-toolbar-item ${
      view === name ? 'saka-toolbar-item__active' : ''}`}
    onClick={setView}> { name } </a>
);

const mapDispatchToProps = (dispatch) => ({
  setView: (name) => () => { dispatch(setView(name)); }
});
const mergeProps = (stateProps, { setView }, { name, view }) => ({
  setView: setView(name),
  name,
  view
});
export default connect(null, mapDispatchToProps, mergeProps)(OptionsMenuTab);
