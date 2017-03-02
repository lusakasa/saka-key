import { Mode } from './mode';

class Text extends Mode {
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
    if (event.detail.class === 'toggleEnabled') {
      if (event.detail.enabled) {
        return this.mode;
      } else {
        return 'DISABLED';
      }
    }
    return this.mode;
  }
}

export const TEXT = new Text('TEXT');

