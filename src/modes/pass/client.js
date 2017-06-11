import { isModifierKey } from 'lib/keys';

let passKeysLeft = 0;
let seenExitKeys = 0;

export default {
  onEnter: (event) => {
    switch (event.passKeyType) {
      // initialize to 2 instead of 1 to ignore the initial keyup event
      // from the key that triggered Pass mode
      case 'one': passKeysLeft = 2; break;
      // -1 means never exit Pass mode
      case 'all': passKeysLeft = -1; break;
      default: console.error('passKeyType was unspecified');
    }
    seenExitKeys = 0;
  },
  keyup: (event) => {
    if (passKeysLeft === -1) {
      seenExitKeys = event.key === 'Alt'
        ? seenExitKeys + 1
        : 0;
      return seenExitKeys === 2
        ? 'Reset'
        : 'Same';
    } else {
      return (isModifierKey(event) || passKeysLeft === -1)
        ? 'Same'
        : (--passKeysLeft === 0) ? 'Reset' : 'Same';
    }
  },
  blur: () => 'Reset',
  focus: () => 'Reset'
};
