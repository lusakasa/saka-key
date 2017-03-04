import { isTextEditable } from 'lib/dom';

export const TEXT = {
  onEnter: async function (event) {

  },
  onExit: async function (event) {

  },
  keydown: async function (event) {
    return 'TEXT';
  },
  keypress: async function (event) {
    return 'TEXT';
  },
  keyup: async function (event) {
    return 'TEXT';
  },
  focusin: async function (event) {
    if (isTextEditable(event.target)) {
      return 'TEXT';
    }
    return 'COMMAND';
  },
  focusout: async function (event) {
    if (isTextEditable(event.relatedTarget)) {
      return 'TEXT';
    }
    return 'COMMAND';
  },
  click: async function (event) {
    return 'TEXT';
  },
  mousedown: async function (event) {
    return 'TEXT';
  },
  scroll: async function (event) {
    return 'TEXT';
  },
  msg: async function (event) {
    const { detail: { type, arg, src } } = event;
    return await (this.actions[type](arg, src));
  },
  actions: {
    toggleEnabled: ({ enabled }) => {
      if (enabled) {
        if (isTextEditable(event.target)) {
          return 'TEXT';
        }
        return 'COMMAND';
      }
      return 'DISABLED';
    }
  }
};
