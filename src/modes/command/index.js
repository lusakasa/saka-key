import { Mode } from 'modes/mode';
import { commandTrie } from './commandTrie';
import { commands } from './commands';
import { isTextEditable } from 'lib/dom';

class Command extends Mode {
  async onEnter (event) {
    commandTrie.reset();
  }
  async onExit (event) {
    commandTrie.reset();
  }
  async keydown (event) {
    event.stopImmediatePropagation();
    return 'COMMAND';
  }
  async keypress (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const command = commandTrie.advance(event);
    if (command) {
      const nextMode = commands[command]();
      if (nextMode) {
        return nextMode;
      }
    }
    return 'COMMAND';
  }
  async keyup (event) {
    event.stopImmediatePropagation();
    return 'COMMAND';
  }
  async focusin (event) {
    if (isTextEditable(event.target)) {
      return 'TEXT';
    }
    return 'COMMAND';
  }
  async focusout (event) {
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

