export class Mode {
  constructor (name) {
    this.name = name;
  }
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
  msg = async (event) => {
    const { action, arg, src } = event;
    const handler = this.actions[action];
    if (SAKA_DEBUG && !handler) throw Error(`Mode ${this.name} has no handler for action ${action}`);
    return await (this.actions[action](arg, src));
  }
  actions = {}
}
