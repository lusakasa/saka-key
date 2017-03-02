import { Mode } from './mode';

class Disabled extends Mode {
  async keydown (event) {
    return this.mode;
  }
  async keypress (event) {
    return this.mode;
  }
  async keyup (event) {
    return this.mode;
  }
  async focus (event) {
    return this.mode;
  }
  async blur (event) {
    return this.mode;
  }
  async click (event) {
    return this.mode;
  }
  async mousedown (event) {
    return this.mode;
  }
  async scroll (event) {
    return this.mode;
  }
  async saka (event) {
    if (event.class === 'toggleEnable') {
      if (event.enabled) {
        return 'DOCUMENT_FOCUSED';
      } else {
        return this.mode;
      }
    }
  }
}

export const DISABLED = new Disabled('DISABLED');
