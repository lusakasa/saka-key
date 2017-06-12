import { Component, render, h } from 'preact';
import { modeMsg } from 'client/msg';
import { mouseEvent } from 'lib/dom';
import { isMac } from 'lib/keys';
import { hintType } from './index';

export let showHints;
export let hideHints;
export let advanceHints;

let horizontalPlacement;
let verticalPlacement;

export function setHintRenderSettings ({
  hintCSS,
  hintNormalCharCSS,
  hintActiveCharCSS,
  hintHorizontalPlacement,
  hintVerticalPlacement
}) {
  horizontalPlacement = hintHorizontalPlacement;
  verticalPlacement = hintVerticalPlacement;
  document.querySelector('#sakaHintStyle').innerText = `
.saka-hint-body {
  ${hintCSS}
}
.saka-hint-normal-char {
  ${hintNormalCharCSS}
}
.saka-hint-active-char {
  ${hintActiveCharCSS}
}`;
}

function activateHint (hint, hintType) {
  const click = (modifiers) => mouseEvent(hint.element, 'click', modifiers);
  switch (hintType) {
    case 'backgroundTab':
      click({ ctrlKey: !isMac, metaKey: isMac }); break;
    case 'foregroundTab':
      click({ ctrlKey: !isMac, metaKey: isMac, shiftKey: true }); break;
    case 'newWindow':
      click({ shiftKey: true }); break;
    case 'incognitoWindow':
      if (hint.element.href) {
        modeMsg(1, 'Hints', 'openLinkInIncognitoWindow', hint.element.href);
      }
      break;
    case 'download':
      click({ altKey: true }); break;
    case 'currentTab':
    default:
      click();
  }
  hint.element.focus();
  return 'Reset';
}

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
    showHints = (hints, hintStrings) => {
      const labeledHints = hints.map((hint, i) => Object.assign(hint, { hintString: hintStrings[i] }));
      this.setState({
        hints: labeledHints,
        filteredHints: labeledHints,
        inputKeys: ''
      });
    };
    advanceHints = (key) => {
      const hints = this.state.hints;
      const inputKeys = this.state.inputKeys + key;
      const filteredHints = this.state.hints.filter((hint) => {
        return hint.hintString.startsWith(inputKeys);
      });
      if (filteredHints.length === 1 && inputKeys === filteredHints[0].hintString) {
        return activateHint(filteredHints[0], hintType);
      }
      this.setState({
        hints,
        filteredHints,
        inputKeys
      });
      return filteredHints.length === 0 ? 'Filtered' : 'Same';
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
            rect={hint.rect}
            horizontalPlacement={horizontalPlacement}
            verticalPlacement={verticalPlacement}
            seen={this.state.inputKeys.length} />
        ))}
      </div>
    );
  }
}

function computeHintPositionStyle (rect, horizontalPlacement, verticalPlacement) {
  const style = { position: 'absolute' };
  const translate = { x: 0, y: 0 };
  switch (horizontalPlacement) {
    case 'left':
      style.left = `${window.scrollX + rect.left}px`;
      break;
    case 'right':
      style.left = `${window.scrollX + rect.left + rect.width}px`;
      translate.x = -100;
      break;
    default: // center
      style.left = `${window.scrollX + rect.left + rect.width / 2}px`;
      translate.x = -50;
  }
  switch (verticalPlacement) {
    case 'top':
      style.top = `${window.scrollY + rect.top}px`;
      break;
    case 'bottom':
      style.top = `${window.scrollY + rect.top + rect.height}px`;
      translate.y = -100;
      break;
    default: // center
      style.top = `${window.scrollY + rect.top + rect.height / 2}px`;
      translate.y = -50;
  }
  style.transform = `translate3d(${translate.x}%, ${translate.y}%, 0)`;
  return style;
}

const Hint = ({ hintString, rect, horizontalPlacement, verticalPlacement, seen }) => (
  <div
    className='saka-hint-body'
    style={computeHintPositionStyle(rect, horizontalPlacement, verticalPlacement)}>
    { hintString.split('').map((char, i) => (
      <span
        className={i >= seen
          ? 'saka-hint-normal-char'
          : 'saka-hint-active-char'}
      >
        {char}
      </span>
    ))}
  </div>
);

const hintContainer = document.createElement('div');

// Ideally, should use shadow dom, but only chrome supports it (3/2017)
// fallback is to reset styles on all child hints (see styles.js)
// if (SAKA_PLATFORM === 'chrome') {
//   const shadow = hintContainer.attachShadow({mode: 'open'});
//   shadow.innerHTML = `<style id='sakaHintStyle'>${style}</style>`;
//   render(<HintRenderer />, shadow);
// } else {
hintContainer.innerHTML = `
<style> @font-face {
  font-family: Roboto; -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased;
  font-style: normal; font-weight: normal; src: url(${chrome.runtime.getURL('Roboto-Regular.tff')}) format('tff');}
</style>
<style id='sakaHintStyle'></style>`;
document.documentElement.appendChild(hintContainer);
render(<HintRenderer />, hintContainer);
// }
