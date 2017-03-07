import { modeMsg } from 'background_page/msg';
import { state } from 'background_page/state';

class Uninitialized {
  actions = {
    initClient: (arg, src) => {
      modeMsg(src, 'initClient', {
        enabled: state.enabled,
        bindings: state.bindings
      });
    }
  }
}

export const UNINITIALIZED = new Uninitialized('UNINITIALIZED');
