import { Mode } from 'modes/mode/client';
import { isTextEditable } from 'lib/dom';
import { showToolbar, hideToolbar, showAnchors, hideAnchors,
  showHints, hideHints } from './highlights';

class Debug extends Mode {
  onEnter = async (event) => {
    // showToolbar();
    showAnchors();
    showHints();
  }
  onExit = async (event) => {
    // hideToolbar();
    hideAnchors();
    hideHints();
  }
  keydown = async (event) => {
    event.stopImmediatePropagation();
    return this.name;
  }
  keypress = async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
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
    return this.name;
  }
  scroll = async (event) => {
    return this.name;
  }
  actions = {}
}

export const DEBUG = new Debug('DEBUG');
