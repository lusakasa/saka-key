import { h } from 'preact';
import { connect } from 'preact-redux';
import { setView } from 'options/actions';
import './style.css';

const OptionsMenuTab = ({ children, name, view, setView }) => (
  <a
    className={`mdc-typography--subheading2 saka-toolbar-item ${
      view === name ? 'saka-toolbar-item__active' : ''}`}
    onClick={setView}>
    { children }
  </a>
);

const mapDispatchToProps = (dispatch) => ({
  setView: (name) => () => { dispatch(setView(name)); }
});
const mergeProps = (stateProps, { setView }, { name, view, children }) => ({
  setView: setView(name),
  name,
  view,
  children
});
export default connect(null, mapDispatchToProps, mergeProps)(OptionsMenuTab);
