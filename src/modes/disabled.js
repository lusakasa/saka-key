import { Mode } from './mode';
import { isTextEditable } from 'lib/dom';

class Disabled extends Mode {
  async onEnter (event) {

  }
  async onExit (event) {

  }
  async keydown (event) {
    return 'DISABLED';
  }
  async keypress (event) {
    return 'DISABLED';
  }
  async keyup (event) {
    return 'DISABLED';
  }
  async focusin (event) {
    return 'DISABLED';
  }
  async focusout (event) {
    return 'DISABLED';
  }
  async click (event) {
    return 'DISABLED';
  }
  async mousedown (event) {
    return 'DISABLED';
  }
  async scroll (event) {
    return 'DISABLED';
  }
  async saka (event) {
    if (event.detail.class === 'toggleEnabled') {
      if (event.detail.enabled) {
        if (isTextEditable(event.target)) {
          return 'TEXT';
        }
        return 'COMMAND';
      } else {
        return 'DISABLED';
      }
    }
    return 'DISABLED';
  }
}

export const DISABLED = new Disabled('DISABLED');
