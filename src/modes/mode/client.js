export class Mode {
  fallbacks = ['GLOBAL']
  constructor (name) {
    this.name = name;
  }
  msg = async (event) => {
    const { action, arg, src } = event;
    const handler = this.actions[action];
    if (SAKA_DEBUG && !handler) throw Error(`Mode ${this.name} has no handler for action ${action}`);
    return await (this.actions[action](arg, src));
  }
  actions = {}
  handle = async (event) => {
    if (event.type === 'msg') {
      if (this.actions.hasOwnProperty(event.action)) {
        return this.msg(event);
      }
    } else if (this.hasOwnProperty(event.type)) {
      return this[event.type](event);
    }
    return false;
  }
}
