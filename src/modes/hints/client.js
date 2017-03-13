import { Mode } from 'modes/mode/client';
import { isTextEditable } from 'lib/dom';
import { render, h } from 'preact';
import { HintRenderer, showHints, hideHints, advanceOnKey } from './HintRenderer';
import { settings } from './settings';

const style = (
`@font-face {
  font-family: Roboto;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-style: normal;
  font-weight: normal;
  src: url(${chrome.runtime.getURL('Roboto-Regular.tff')}) format('tff');
}
.hint {
  z-index: 999999999999;
  font-family: Roboto, sans-serif;
  font-weight: 100;
  font-size: 12px;
  padding: 0px 1px;
  border-width: 1px;
  border-style: solid;
  border-color: #ff4081;
  color: #ff4081;
  background-color: #ffffff;
  border-radius: 4px;
  /* margin: 0px 1px; */
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;
}`
);


class Hints extends Mode {
  constructor (name) {
    super(name);
    const hintContainer = document.createElement('div');
    document.documentElement.appendChild(hintContainer);
    const shadow = hintContainer.attachShadow({mode: 'open'});
    console.log(style);
    shadow.innerHTML = `<style>${style}</style>`;
    render(<HintRenderer />, shadow);
  }
  onEnter = async (event) => {
    showHints();
  }
  onExit = async (event) => {
    hideHints();
  }
  keydown = async (event) => {
    event.stopImmediatePropagation();
    return 'HINTS';
  }
  keypress = async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (settings.hintCharacters.includes(event.key)) {
      return advanceOnKey(event.key);
    }
    return 'COMMAND';
  }
  keyup = async (event) => {
    return this.name;
  }
  focusin = async (event) => {
    if (isTextEditable(event.target)) {
      return 'TEXT';
    }
    return this.name;
  }
  focusout = async (event) => {
    return this.name;
  }
  click = async (event) => {
    return this.name;
  }
  mousedown = async (event) => {
    if (SAKA_DEBUG) return 'HINTS';
    if (isTextEditable(event.target)) {
      return 'TEXT';
    }
    return 'COMMAND';
  }
  scroll = async (event) => {
    return this.name;
  }
  actions = {}
}

export const HINTS = new Hints('HINTS');
