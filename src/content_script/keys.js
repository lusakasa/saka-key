import { msg } from 'mosi/client';
import { state } from './state';
import {
  scrollDown, scrollUp, scrollLeft, scrollRight,
  scrollPageDown, scrollPageUp, scrollHalfPageDown, scrollHalfPageUp,
  scrollToBottom, scrollToTop, scrollToLeft, scrollToRight
} from 'saka-actions/content-script';



/*

g
sg
bb
ba

{
  g: ACTION1,
  sg: ACTION2,
  b-b: ACTION3,
  b-a: ACTION4
}
*/

export function initKeyHandling (bindings) {
  state.bindings = bindings;
};

let seen = '';
export function processKeyEvent (event) {
  seen = seen + (seen === '' ? '' : '-') + keyString(event);
  const action = state.bindings[seen];
  if (action) {
    action();
  }
};

const backgroundPage = (command, args) => () => { msg(1, command, args); };
const actions = {
  requestShowHelpMenu: backgroundPage('requestShowHelpMenu'),
  scrollDown,
  scrollUp,
  scrollLeft,
  scrollRight,
  scrollPageDown,
  scrollPageUp,
  scrollHalfPageDown,
  scrollHalfPageUp,
  scrollToBottom,
  scrollToTop,
  scrollToLeft,
  scrollToRight,
  previousTab: backgroundPage('previousTab'),
  nextTab: backgroundPage('nextTab'),
  firstTab: backgroundPage('firstTab'),
  lastTab: backgroundPage('lastTab'),
  moveTabLeft: backgroundPage('moveTabLeft'),
  moveTabRight: backgroundPage('moveTabRight'),
  moveTabFirst: backgroundPage('moveTabFirst'),
  moveTabLast: backgroundPage('moveTabLast'),
  closeTab: backgroundPage('closeTab'),
  closeOtherTabs: backgroundPage('closeOtherTabs'),
  closeRightTabs: backgroundPage('closeRightTabs'),
  closeLeftTabs: backgroundPage('closeLeftTabs'),
  newTab: backgroundPage('newTab'),
  restoreTab: backgroundPage('restoreTab'),
  duplicateTab: backgroundPage('duplicateTab'),
  newWindow: backgroundPage('newWindow'),
  switchWindow: backgroundPage('switchWindow'),
  zoomIn: backgroundPage('zoomIn'),
  zoomOut: backgroundPage('zoomOut'),
  zoomReset: backgroundPage('zoomReset'),
  refreshTab: backgroundPage('refreshTab'),
  refreshAllTabs: backgroundPage('refreshAllTabs'),
  toggleMuteTab: backgroundPage('toggleMuteTab'),
  toggleMuteAllTabs: backgroundPage('toggleMuteAllTabs'),
  togglePinTab: backgroundPage('togglePinTab')
};

// handle event on bubble down so that key handling suppresses any keyhandling of visited page
// handle only keypress events, suppress the restoreTab

// TODO: work on case sensitivity
const textInputTypes = [ 'text', 'search', 'email', 'url', 'number', 'password', 'date', 'tel' ];
function textElementFocused () {
  const e = document.activeElement;
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
};

function validKeyEvent (event) {
  return !(event.ctrlKey || event.altlKey || event.metaKey);
}

function handledBySakaKey (event) {
  return state.enabled && !textElementFocused() && validKeyEvent(event);
}

function getKeyString (event) {
  return (event.ctrlKey || event.altKey || event.metaKey)
    ? `${
      event.code}+${
      event.shiftKey ? 'S' : ''}${
      event.ctrlKey ? 'C' : ''}${
      event.altKey ? 'A' : ''}${
      event.metaKey ? 'M' : ''}`
    : event.key;
}

function handleKeyEvent (keyString) {
  const action = inputTrie.advance(keyString);
  if (action) {
    (actions[action] || (() => console.log('pressed ' + event.key)))();
  }
}

document.addEventListener('keydown', (event) => {
  if (handledBySakaKey(event)) {
    event.stopPropagation();
  }
}, true);

document.addEventListener('keypress', (event) => {
  if (handledBySakaKey(event)) {
    const key = getKeyString(event);
    handleKeyEvent(key);
    event.stopPropagation();
  }
}, true);

document.addEventListener('keyup', (event) => {
  if (handledBySakaKey(event)) {
    event.stopPropagation();
  }
}, true);
