let modes = {};

export function modeAction ({ mode, action, arg }, src) {
  modes[mode].actions[action](arg, src);
};

export function initModes (availableModes) {
  modes = availableModes;
};

