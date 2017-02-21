import { init, msg } from 'mosi/client';
import {
  scrollDown, scrollUp, scrollLeft, scrollRight,
  scrollPageDown, scrollPageUp, scrollHalfPageDown, scrollHalfPageUp,
  scrollToBottom, scrollToTop, scrollToLeft, scrollToRight
} from 'saka-actions/content-script';

console.log('content_script loaded');

init({});

let enabled = true;

const backgroundPage = (command, args) => () => { msg(1, command, args); };

const keyBindings = {
  'q': scrollDown,
  'w': scrollUp,
  'e': scrollLeft,
  'r': scrollRight,
  't': scrollPageDown,
  'y': scrollPageUp,
  'u': scrollHalfPageDown,
  'i': scrollHalfPageUp,
  'o': scrollToBottom,
  'p': scrollToTop,
  'a': scrollToLeft,
  's': scrollToRight,
  'd': backgroundPage('previousTab'),
  'f': backgroundPage('nextTab'),
  'g': backgroundPage('firstTab'),
  'j': backgroundPage('lastTab'),
  'k': backgroundPage('moveTabLeft'),
  'l': backgroundPage('moveTabRight'),
  'z': backgroundPage('moveTabFirst'),
  'x': backgroundPage('moveTabLast'),
  // 'c': backgroundPage('closeTab'),
  // 'v': backgroundPage('closeOtherTabs'),
  // 'b': backgroundPage('closeRightTabs'),
  // 'n': backgroundPage('closeLeftTabs'),
  'm': backgroundPage('newTab'),
  '1': backgroundPage('restoreTab'),
  '-': backgroundPage('duplicateTab'),
  '2': backgroundPage('newWindow'),
  '3': backgroundPage('switchWindow'),
  '4': backgroundPage('zoomIn'),
  '5': backgroundPage('zoomOut'),
  '6': backgroundPage('zoomReset'),
  '7': backgroundPage('refreshTab'),
  '8': backgroundPage('refreshAllTabs'),
  '9': backgroundPage('toggleMuteTab'),
  '0': backgroundPage('toggleMuteAllTabs'),
  '.': backgroundPage('togglePinTab')
};


document.addEventListener('keydown', (event) => {
  if (event.key === '`') {
    enabled = !enabled;
    console.log('saka-actions ' + (enabled ? 'enabled' : 'disabled'));
  } else if (enabled) {
    (keyBindings[event.key] || (() => console.log('pressed ' + event.key)))();
  }
});
