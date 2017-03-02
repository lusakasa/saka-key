import { Mode } from './mode';
import { commandTrie } from '../client/commandTrie';

class Command extends Mode {
  async keydown (event) {
    event.stopPropagation();
    return 'COMMAND';
  }
  async keypress (event) {
    event.stopPropagation();
    return commandTrie.handleKeyEvent(event);
  }
  async keyup (event) {
    event.stopPropagation();
    return 'COMMAND';
  }
  async focus (event) {
    return 'COMMAND';
  }
  async blur (event) {
    return 'COMMAND';
  }
  async click (event) {
    return 'COMMAND';
  }
  async mousedown (event) {
    return 'COMMAND';
  }
  async scroll (event) {
    return 'COMMAND';
  }
  async saka (event) {
    if (event.detail.class === 'toggleEnabled') {
      if (event.detail.enabled) {
        return 'COMMAND';
      } else {
        return 'DISABLED';
      }
    }
    return 'COMMAND';
  }
}

export const COMMAND = new Command('COMMAND');

