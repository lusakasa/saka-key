import { Mode } from './mode';
import { inputTrie } from '../client/inputTrie';

class Command extends Mode {
  async keydown (event) {
    event.stopPropagation();
    return this.mode;
  }
  async keypress (event) {
    event.stopPropagation();
    return inputTrie.handleKeyEvent(event);
  }
  async keyup (event) {
    event.stopPropagation();
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
    return this.mode;
  }
}

export const COMMAND = new Command('COMMAND');

