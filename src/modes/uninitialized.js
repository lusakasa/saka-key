import { commandTrie } from 'modes/command/commandTrie';
import { isTextEditable } from 'lib/dom';

class Uninitialized {
  name = 'UNINITIALIZED'
  onEnter = async (event) => {
    return this.name;
  }
  onExit = async (event) => {
    return this.name;
  }
  keydown = async (event) => {
    return this.name;
  }
  keypress = async (event) => {
    return this.name;
  }
  keyup = async (event) => {
    return this.name;
  }
  focusin = async (event) => {
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
  actions = {
    initClient: ({ enabled, bindings }) => {
      commandTrie.init(bindings);
      if (enabled) {
        if (isTextEditable(document.activeElement)) {
          return 'TEXT';
        } else {
          return 'COMMAND';
        }
      }
      return 'DISABLED';
    }
  }
  msg = async (event) => {
    const { action, arg, src } = event;
    return await (this.actions[action](arg, src));
  }
}

export const UNINITIALIZED = new Uninitialized();
