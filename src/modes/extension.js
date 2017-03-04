import { get } from 'mosi/client';

export class Extension {
  constructor (name) {
    this.name = name;
  }
  onEnter = async (event) => {
    return await this.externalEvent(event);
  }
  onExit = async (event) => {
    return await this.externalEvent(event);
  }
  keydown = async (event) => {
    return await this.externalEvent(event);
  }
  keypress = async (event) => {
    return await this.externalEvent(event);
  }
  keyup = async (event) => {
    return await this.externalEvent(event);
  }
  focusin = async (event) => {
    return await this.externalEvent(event);
  }
  focusout = async (event) => {
    return await this.externalEvent(event);
  }
  click = async (event) => {
    return await this.externalEvent(event);
  }
  mousedown = async (event) => {
    return await this.externalEvent(event);
  }
  scroll = async (event) => {
    return await this.externalEvent(event);
  }
  msg = async (event) => {
    const { action, arg, src } = event;
    return await (this.actions[action](arg, src));
  }
  externalEvent = async (event) => {
    return await (get(1, 'externalEvent', { name: this.name, event: serializeEvent(event) })).v;
  }
}

function serializeEvent (event) {
  return 'blah';
}
