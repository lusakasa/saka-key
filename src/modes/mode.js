import { state } from '../state';

export class Mode {
  constructor (mode) {
    this.mode = mode;
    state.modes[mode] = true;
  }
  async handleEvent (event) {
    const handler = this[event.type];
    if (handler) {
      const nextMode = await handler(event);
      if (state.modes[nextMode]) {
        return nextMode;
      }
      throw Error(`Invalid next mode ${nextMode}`);
    }
    throw Error(`Unhandled event of type ${event.type}`);
  }
}
