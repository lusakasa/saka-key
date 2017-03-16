import { msg } from 'mosi/core';
import { state } from 'background_page/state';

const MODE = 'UNINITIALIZED';

export const mode = {
  name: MODE,
  messages: {
    initClient: (arg, src) => {
      msg(src, 'modeAction', {
        mode: MODE,
        action: 'initClient',
        arg: {
          enabled: state.enabled,
          bindings: state.bindings
        }
      });
    }
  }
};
