import { Mode } from 'modes/mode';
import { isTextEditable } from 'lib/dom';

class Text extends Mode {
  onEnter = async (event) => {

  }
  onExit = async (event) => {

  }
  keydown = async (event) => {
    return 'TEXT';
  }
  keypress = async (event) => {
    return 'TEXT';
  }
  keyup = async (event) => {
    return 'TEXT';
  }
  focusin = async (event) => {
    if (isTextEditable(event.target)) {
      return 'TEXT';
    }
    return 'COMMAND';
  }
  focusout = async (event) => {
    if (isTextEditable(event.relatedTarget)) {
      return 'TEXT';
    }
    return 'COMMAND';
  }
  click = async (event) => {
    return 'TEXT';
  }
  mousedown = async (event) => {
    return 'TEXT';
  }
  scroll = async (event) => {
    return 'TEXT';
  }
  actions = {
    setEnabled: (enabled) => {
      if (enabled) {
        if (isTextEditable(document.activeElement)) {
          return 'TEXT';
        }
        return 'COMMAND';
      }
      return 'DISABLED';
    }
  }
}

export const TEXT = new Text('TEXT');
