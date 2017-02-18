import { init, msg } from 'mosi/client';
import {
  printMsg,
  scrollDown, scrollUp, scrollLeft, scrollRight,
  scrollPageDown, scrollPageUp, scrollHalfPageDown, scrollHalfPageUp,
  scrollToBottom, scrollToTop, scrollToLeft, scrollToRight
} from 'saka-actions/content-script';

init({});

let enabled = true;

const backgroundPage = (command, args) => () => { msg(1, command, args); };

const keyBindings = {
  'w': scrollDown,
  'e': scrollUp,
  'r': scrollLeft,
  't': scrollRight,
  'y': scrollPageDown,
  'u': scrollPageUp,
  'i': scrollHalfPageDown,
  'p': scrollHalfPageUp,
  'a': scrollToBottom,
  's': scrollToTop,
  'd': scrollToLeft,
  'f': scrollToRight,
  'g': backgroundPage('previousTab'),
  'h': backgroundPage('nextTab'),
  'i': backgroundPage('firstTab'),
  'j': backgroundPage('lastTab'),
  'k': backgroundPage('moveTabLeft'),
  'l': backgroundPage('moveTabRight'),
  'z': backgroundPage('moveTabFirst'),
  'x': backgroundPage('moveTabLast'),
  'c': backgroundPage('closeTab'),
  'v': backgroundPage('closeOtherTabs'),
  'b': backgroundPage('closeRightTabs'),
  'n': backgroundPage('closeLeftTabs'),
  'm': backgroundPage('newTab'),
  '1': backgroundPage('restoreTab'),
  '2': backgroundPage('newWindow'),
  '3': backgroundPage('switchWindow'),
  '4': backgroundPage('zoomIn'),
  '5': backgroundPage('zoomOut'),
  '6': backgroundPage('zoomReset'),
  '7': backgroundPage('refreshTab'),
  '8': backgroundPage('refreshAllTabs'),
  '9': backgroundPage('toggleMuteTab'),
  '0': backgroundPage('muteAllTabs'),
  ',': backgroundPage('unmuteAllTabs'),
  '.': backgroundPage('togglePinTab'),
};


document.addEventListener('keydown', (event) => {
  if (event.key == '`') {
    enabled = !enabled;
    console.log('saka-actions ' + (enabled ? 'enabled' : 'disabled'));
  } else if (enabled) {
    (keyBindings[event.key] || (() => console.log('pressed ' + event.key)))();
  }
})
