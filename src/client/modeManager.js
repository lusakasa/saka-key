import { Extension } from 'modes/extension';

class ModeManager {
  constructor () {
    this.init = this.init.bind(this);
    this.addExtension = this.addExtension.bind(this);
    this.installListeners = this.installListeners.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }
  init (startMode, modes) {
    this.mode = startMode;
    this.modes = modes;
    console.log(`mode initialized to ${this.mode}`);
    this.installListeners();
  }
  addExtension (name) {
    this.modes[name] = new Extension(name);
  }
  installListeners () {
    const eventTypes = [
      'keydown',
      'keypress',
      'keyup',
      'focusin',
      'focusout',
      'click',
      'mousedown',
      'scroll',
      'saka'
    ];
    eventTypes.forEach((eventType) => {
      document.addEventListener(eventType, this.handleEvent, true);
    });
    window.addEventListener('DOMContentLoaded', (event) => {
      console.log('DOMContentLoaded');
      document.activeElement && document.activeElement.blur && document.activeElement.blur();
    });
    window.addEventListener('load', (event) => {
      console.log('load');
      document.activeElement && document.activeElement.blur && document.activeElement.blur();
    });
  }
  async handleEvent (event) {
    const nextMode = await this.modes[this.mode].handleEvent(event);
    if (nextMode !== this.mode) {
      console.log(`mode changed from ${this.mode} to ${nextMode} on event:`, event);
      await this.modes[this.mode].onExit(event);
      await this.modes[this.mode].onEnter(event);
    }
    this.mode = nextMode;
  }
}

export const modeManager = new ModeManager();
