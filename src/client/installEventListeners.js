import { fullscreenchange } from 'lib/dom';

export function installEventListeners () {
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
  window.handleDOMEvent = () => {};
  eventTypes.forEach((eventType) => {
    window.addEventListener(eventType, (event) => {
      window.handleDOMEvent(event);
    }, true);
  });
}
