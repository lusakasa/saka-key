import { Component, render, h } from 'preact';
import { findHints } from './findHints';
import { settings } from './settings';
import { mouseEvent, isTextEditable } from 'lib/dom';
import { style } from './style';

export let showHints;
export let hideHints;
export let advanceOnKey;

class HintRenderer extends Component {
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
      const labeledHints = hints.map((hint, i) => Object.assign(hint, { hintString: hintStrings[i] }));
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
        return activateHint(filteredHints[0]);
      } else if (filteredHints.length === 0) {
        return 'Command';
      }
      this.setState({
        hints,
        filteredHints,
        inputKeys
      });
      return 'Hints';
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

function activateHint (hint) {
  if (isTextEditable(hint.element)) {
    hint.element.focus();
    return 'Text';
  }
  mouseEvent('click', hint.element);
  return 'Command';
}

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

const hintContainer = document.createElement('div');
// Ideally, should use shadow dom, but only chrome supports it (3/2017)
// fallback is to reset styles on all child hints (see styles.js)
if (SAKA_PLATFORM === 'chrome') {
  document.documentElement.appendChild(hintContainer);
  const shadow = hintContainer.attachShadow({mode: 'open'});
  shadow.innerHTML = `<style>${style}</style>`;
  render(<HintRenderer />, shadow);
} else {
  hintContainer.innerHTML = `<style>${style}</style>`;
  document.documentElement.appendChild(hintContainer);
  render(<HintRenderer />, hintContainer);
}
