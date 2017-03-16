/** The available modes */
let modes = {};

export function modeAction ({ mode, action, arg }, src) {
  if (SAKA_DEBUG) {
    if (!modes[mode]) {
      throw Error(`Missing Mode ${mode}`);
    }
    if (!modes[mode].messages[action]) {
      throw Error(`Mode ${mode} is missing a handler for action ${action}`);
    }
  }
  modes[mode].messages[action](arg, src);
};

export function initModes (availableModes) {
  modes = availableModes;
  addListeners(modes);
}

function addListeners (modes) {
  chrome.runtime.onInstalled.addListener((details) => {
    Object.values(modes).forEach((mode) => {
      mode.onInstalled(details);
    });
  });
  chrome.runtime.onStartup.addListener(() => {
    Object.values(modes).forEach((mode) => {
      mode.onStartup();
    });
  });
}
