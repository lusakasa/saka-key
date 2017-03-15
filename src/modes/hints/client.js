import { Mode } from 'modes/mode/client';
import { isTextEditable } from 'lib/dom';
import { render, h } from 'preact';
import { HintRenderer, showHints, hideHints, advanceOnKey } from './HintRenderer';
import { settings } from './settings';
import { style } from './style';

class Hints extends Mode {
  constructor (name) {
    super(name);
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
