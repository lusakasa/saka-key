import { Mode } from 'modes/mode/client';
import { isTextEditable } from 'lib/dom';
import { toggleHelpMenu } from './help';

class Global extends Mode {
  onEnter = async (event) => {

  }
  onExit = async (event) => {

  }
  keydown = async (event) => {

  }
  keypress = async (event) => {

  }
  keyup = async (event) => {

  }
  focusin = async (event) => {

  }
  focusout = async (event) => {

  }
  click = async (event) => {

  }
  mousedown = async (event) => {

  }
  scroll = async (event) => {

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
    },
    toggleHelpMenu
  }
}

export const GLOBAL = new Global('GLOBAL');
