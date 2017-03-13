import { Component, h } from 'preact';
import { findHints } from './find';
import { settings } from './settings';

export let showHints;
export let hideHints;
export let advanceOnKey;

// https://github.com/1995eaton/chromium-vim/blob/48226e1f86639dd2cbf18792fa078b7969da078f/content_scripts/dom.js
function mouseEvent (type, element) {
  let events;
  switch (type) {
    case 'hover': events = ['mouseover', 'mouseenter']; break;
    case 'unhover': events = ['mouseout', 'mouseleave']; break;
    case 'click': events = ['mouseover', 'mousedown', 'mouseup', 'click']; break;
  }
  events.forEach((eventName) => {
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent(eventName, true, true, window, 1, 0, 0, 0, 0, false,
        false, false, false, 0, null);
    element.dispatchEvent(event);
  });
}

export class HintRenderer extends Component {
  constructor () {
    super();
    this.state = {
      hints: [],
      filteredHints: [],
      inputKeys: []
    };
  }
  componentDidMount () {
    showHints = () => {
      const hints = findHints();
      const hintStrings = generateHintStrings(settings.hintCharacters, hints.length);
      const labeledHints = hints.map((hint, i) => Object.assign(hint, { hintString: hintStrings[i] }))
      this.setState({
        hints: labeledHints,
        filteredHints: labeledHints,
        inputKeys: ''
      });
    };
    advanceOnKey = (key) => {
      const hints = this.state.hints;
      const inputKeys = this.state.inputKeys + key;
      const filteredHints = this.state.hints
        .filter((hint) => hint.hintString.startsWith(inputKeys));
      if (filteredHints.length === 1 && inputKeys === filteredHints[0].hintString) {
        mouseEvent('click', filteredHints[0].element);
        return 'COMMAND';
      }
      this.setState({
        hints,
        filteredHints,
        inputKeys
      });
      return 'HINTS';
    };
    hideHints = () => {
      this.setState({
        hints: [],
        filteredHints: [],
        inputKeys: ''
      });
    };
  }
  render () {
    return (
      <div style={{ position: 'absolute', left: '0', top: '0' }}>
        {this.state.filteredHints.map((hint) => (
          <Hint
            hintString={hint.hintString}
            left={hint.rect.left + window.scrollX}
            top={hint.rect.top + window.scrollY}
            seen={this.state.inputKeys.length} />
        ))}
      </div>
    );
  }
}

const Hint = ({ hintString, left, top, seen }) => (
  <div
    className='hint'
    style={{ left: left + 'px', top: top + 'px', position: 'absolute' }}>
    { hintString.split('').map((char, i) => (
      <span style={{opacity: i >= seen ? 1 : 0.5}}>{char}</span>
    ))}
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
