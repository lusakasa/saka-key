/**
 * The mode for passing keys directly to the page
 * E.g. if you want to use the shortcuts defined by a parituclar website
 * like github or gmail instead of Saka Key's shortcuts
 */
import { isModifierKey } from 'lib/keys';
let passKeysLeft = 0;

export const mode = {
  name: 'Pass',
  onEnter: (event) => {
    switch (event.passKeyType) {
      // initialize to 2 instead of 1 to ignore the initial keyup event
      // from the key that triggered Pass mode
      case 'one': passKeysLeft = 2; break;
      case 'all': passKeysLeft = -1; break;
      default: console.error('passKeyType was unspecified');
    }
  },
  onExit: () => {},
  onSettingsChange: (settings) => {},
  events: {
    keydown: () => 'Same',
    keypress: () => 'Same',
    keyup: (event) => (isModifierKey(event) || passKeysLeft === -1)
      ? 'Same'
      : (--passKeysLeft === 0) ? 'Reset' : 'Same',
    blur: () => 'Reset',
    focus: () => 'Reset',
    click: () => 'Same',
    mousedown: () => 'Same'
  },
  messages: {}
};
