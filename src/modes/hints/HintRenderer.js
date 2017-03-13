import { Component, h } from 'preact';
import { findHints } from './find';
import { settings } from './settings';

export let showHints;
export let hideHints;
export let advanceOnKey;

export class HintRenderer extends Component {
  constructor () {
    super();
    this.state = {
      hints: [],
      inputKeys: []
    };
  }
  componentDidMount () {
    showHints = () => {
      this.setState({
        hints: findHints(),
        inputKeys: ''
      });
    };
    advanceOnKey = (key) => {
      this.setState({
        hints: this.state.hints,
        inputKeys: this.state.inputKeys + key
      });
      return 'HINTS';
    };
    hideHints = () => {
      this.setState({
        hints: []
      });
    };
  }
  render () {
    const hintStrings = generateHintStrings(settings.hintCharacters, this.state.hints.length);
    return (
      <div style={{ position: 'absolute', left: '0', top: '0' }}>
        {this.state.hints
          .filter((hint, i) => hintStrings[i].startsWith(this.state.inputKeys))
          .map((hint, i) => (
            <Hint
              hintString={hintStrings[i]}
              left={hint.rect.left + window.scrollX}
              top={hint.rect.top + window.scrollY} />
        ))}
      </div>
    );
  }
}

const Hint = ({ hintString, left, top }) => (
  <div
    className='hint'
    style={{ left: left + 'px', top: top + 'px', position: 'absolute' }}>
    { hintString }
  </div>
);

function generateHintStrings (characters, count) {
  const hints = [''];
  let offset = 0;
  while (hints.length - offset < count || hints.length === 1) {
    const hint = hints[offset++];
    for (const c of characters) {
      hints.push(hint + c);
    }
  }
  return hints.slice(offset, offset + count);
}