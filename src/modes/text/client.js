const MODE = 'Text';

export const mode = {
  name: MODE,
  onCreate: () => {},
  onEnter: (event) => {},
  onExit: (event) => {},
  onSettingsChange: (settings) => {},
  events: {
    keydown: (event) => MODE,
    keypress: (event) => MODE,
    keyup: (event) => MODE,
    focusout: (event) => 'Reset',
    focusin: (event) => 'Reset',
    click: (event) => MODE,
    mousedown: (event) => MODE
  },
  messages: {}
};
