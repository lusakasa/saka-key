import { Mode } from 'modes/mode/client';
import { isTextEditable } from 'lib/dom';

class Disabled extends Mode {
  onEnter = async (event) => {

  }
  onExit = async (event) => {

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
  actions = {}
};

export const DISABLED = new Disabled('DISABLED');
