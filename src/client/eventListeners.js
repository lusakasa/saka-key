import { fullscreenchange } from 'lib/dom';

const eventTypes = [
  'keydown',
  'keypress',
  'keyup',
  'blur',
  'focus',
  'click',
  'mousedown',
  fullscreenchange
];

function handleDOMEvent (event) {
  window.handleDOMEvent(event);
}

export function installEventListeners () {
  window.handleDOMEvent = () => {};
  eventTypes.forEach((eventType, i) => {
    window.addEventListener(eventType, handleDOMEvent, true);
  });
}

export function removeEventListeners () {
  window.handleDOMEvent = () => {};
  eventTypes.forEach((eventType) => {
    window.removeEventListener(eventType, handleDOMEvent, true);
  });
}
