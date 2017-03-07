import { Mode } from 'modes/mode/client';
import { isTextEditable } from 'lib/dom';
import { showHints, hideHints } from './hints';

class Hints extends Mode {
  onEnter = async (event) => {
    showHints();
  }
  onExit = async (event) => {
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
