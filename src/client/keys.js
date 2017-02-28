import { commands } from './commands';
import { state } from './state';
import { keyboardEventString } from '../lib/keys';

export function initKeyHandling (bindings) {
  state.bindings = bindings;
  state.curNode = bindings;
};

/**
 * Advances the input trie based on the input key event.
 * If a leaf node, corresponding to a command, has been reached,
 * returns the command.
 * Otherwise returns undefined
 */
function advanceKeyState (event) {
  const key = keyboardEventString(event);
  // TODO: Update to use longest viable prefix by trying
  // longest prefix until a valid path is found
  const next = state.curNode[key] || state.bindings[key] || state.bindings;
  // Case 1. A trie node
  if (typeof next === 'object') {
    state.curNode = next;
    return undefined;
  // Case 2. A trie leaf corresponding to the command reached
  } else {
    state.curNode = state.bindings;
    return next;
  }
}

// TODO: work on case sensitivity
const textInputTypes = [ 'text', 'search', 'email', 'url', 'number', 'password', 'date', 'tel' ];
function textElementFocused () {
  const e = document.activeElement;
  if (e) {
    if (e.nodeName === 'INPUT') {
      if (!e.disabled && !e.readonly && (!e.type || textInputTypes.includes(e.type))) {
        return true;
      }
    } else if (e.nodeName === 'TEXTAREA') {
      return true;
    } else if (e.contentEditable === 'true') {
      return true;
    }
    return false;
  }
  return false;
};

function handledBySakaKey (event) {
  return state.enabled && !textElementFocused();
}

function handleKeyEvent (event) {
  const command = advanceKeyState(event);
  if (command) {
    (commands[command] || (() => console.log('pressed ' + event.key)))();
  }
}

/**
 * Installs keydown, keypress, and keyup event listeners.
 * Commands are triggered by the keypress handler and ignored  and suppressed
 * by the keydown and keyup handlers.
 * Note that the listeners intercept keyboard events in the capturing phase,
 * not bubbling phase.
 * http://web.archive.org/web/20170125014918/http://javascript.info/tutorial/bubbling-and-capturing
 */
export function addKeyEventListeners () {
  document.addEventListener('keydown', (event) => {
    if (handledBySakaKey(event)) {
      event.stopPropagation();
    }
  }, true);
  document.addEventListener('keypress', (event) => {
    if (handledBySakaKey(event)) {
      handleKeyEvent(event);
      event.stopPropagation();
    }
  }, true);
  document.addEventListener('keyup', (event) => {
    if (handledBySakaKey(event)) {
      event.stopPropagation();
    }
  }, true);
}

