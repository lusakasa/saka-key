import { Component, render, h } from 'preact'
import { guiRoot } from 'client/gui'
import { activate } from './activate'

export let showHints
export let hideHints
export let advanceHints

let fontSize
let useTargetSize
let horizontalPlacement
let verticalPlacement

export function setHintRenderSettings ({
  hintFontSize,
  hintUseTargetSize,
  hintCSS,
  hintNormalCharCSS,
  hintActiveCharCSS,
  hintHorizontalPlacement,
  hintVerticalPlacement
}) {
  fontSize = hintFontSize
  horizontalPlacement = hintHorizontalPlacement
  verticalPlacement = hintVerticalPlacement
  useTargetSize = hintUseTargetSize
  hintStyle.textContent = `
@font-face {
  font-family: Roboto; -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased;
  font-style: normal; font-weight: normal; src: url(${chrome.runtime.getURL(
    'Roboto-Regular.ttf'
  )}) format('ttf');
}
.saka-hint-body {
  ${hintCSS}
}
.saka-hint-normal-char {
  ${hintNormalCharCSS}
}
.saka-hint-active-char {
  ${hintActiveCharCSS}
}`
}

class HintRenderer extends Component {
  constructor () {
    super()
    this.state = {
      hints: [],
      filteredHints: [],
      inputKeys: []
    }
  }
  componentDidMount () {
    showHints = (hints, hintStrings) => {
      const labeledHints = hints.map((hint, i) =>
        Object.assign(hint, { hintString: hintStrings[i] })
      )
      this.setState({
        hints: labeledHints,
        filteredHints: labeledHints,
        inputKeys: ''
      })
    }
    advanceHints = event => {
      const hints = this.state.hints
      const inputKeys = this.state.inputKeys + event.key
      const filteredHints = this.state.hints.filter(hint => {
        return hint.hintString.startsWith(inputKeys)
      })
      this.setState({
        hints,
        filteredHints,
        inputKeys
      })
      return filteredHints.length === 1 &&
      inputKeys === filteredHints[0].hintString
        ? activate(event, filteredHints[0].element)
        : filteredHints.length === 0 ? 'Filtered' : 'Same'
    }
    hideHints = () => {
      this.setState({
        hints: [],
        filteredHints: [],
        inputKeys: ''
      })
    }
  }
  render () {
    return (
      <div style={{ position: 'absolute', left: '0', top: '0' }}>
        {this.state.filteredHints.map(hint => (
          <Hint
            hintString={hint.hintString}
            rect={hint.rect}
            computedStyle={hint.computedStyle}
            horizontalPlacement={horizontalPlacement}
            verticalPlacement={verticalPlacement}
            seen={this.state.inputKeys.length}
          />
        ))}
      </div>
    )
  }
}

function generateFontSize (computedStyle) {
  const computedFontSize = parseFloat(computedStyle.fontSize)
  return useTargetSize && computedFontSize > 5 ? computedFontSize : fontSize
}

const Hint = ({
  hintString,
  rect,
  computedStyle,
  horizontalPlacement,
  verticalPlacement,
  seen
}) => (
  <div
    className='saka-hint-body'
    style={{
      left: `${horizontalPlacement === 'left'
        ? window.scrollX + rect.left
        : horizontalPlacement === 'right'
          ? window.scrollX + rect.left + rect.width
          : window.scrollX + rect.left + rect.width / 2}px`,
      top: `${verticalPlacement === 'top'
        ? window.scrollY + rect.top
        : verticalPlacement === 'bottom'
          ? window.scrollY + rect.top + rect.height
          : window.scrollY + rect.top + rect.height / 2}px`,
      fontSize: generateFontSize(computedStyle)
    }}
  >
    {hintString
      .split('')
      .map((char, i) => (
        <span
          className={
            i >= seen ? 'saka-hint-normal-char' : 'saka-hint-active-char'
          }
        >
          {char}
        </span>
      ))}
  </div>
)

const hostElement = document.createElement('div')
guiRoot.appendChild(hostElement)
const hintContainer =
  SAKA_PLATFORM === 'chrome'
    ? hostElement.attachShadow({ mode: 'open' })
    : hostElement.appendChild(document.createElement('div'))
const hintStyle = document.createElement('style')
hintContainer.appendChild(hintStyle)
render(<HintRenderer />, hintContainer)
