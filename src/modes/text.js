import { Mode } from './mode';
import { isTextEditable } from 'lib/dom';

class Text extends Mode {
  async onEnter (event) {

  }
  async onExit (event) {

  }
  async keydown (event) {
    return 'TEXT';
  }
  async keypress (event) {
    return 'TEXT';
  }
  async keyup (event) {
    return 'TEXT';
  }
  async focusin (event) {
    if (isTextEditable(event.target)) {
      return 'TEXT';
    }
    return 'COMMAND';
  }
  async focusout (event) {
    if (isTextEditable(event.relatedTarget)) {
      return 'TEXT';
    }
    return 'COMMAND';
  }
  async click (event) {
    return 'TEXT';
  }
  async mousedown (event) {
    return 'TEXT';
  }
  async scroll (event) {
    return 'TEXT';
  }
  async saka (event) {
    if (event.detail.class === 'toggleEnabled') {
      if (event.detail.enabled) {
        return 'TEXT';
      } else {
        return 'DISABLED';
      }
    }
    return 'TEXT';
  }
}

export const TEXT = new Text('TEXT');

