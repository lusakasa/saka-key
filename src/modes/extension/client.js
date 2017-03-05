import { get } from 'mosi/client';

export class Extension {
  onEnter = async (event) => {
    return (await get(1, 'extensionOnEnter', { name: this.name, event: serializeEvent(event) })).v;
  }
  onExit = async (event) => {
    return (await get(1, 'extensionOnExit', { name: this.name, event: serializeEvent(event) })).v;
  }
  handle = async (event) => {
    return (await get(1, 'extensionHandle', { name: this.name, event: serializeEvent(event) })).v;
  }
}

function serializeEvent (event) {
  return 'blah';
}
