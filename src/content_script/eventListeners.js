// Saka Key installs exactly one listener for each event type of interest.
//
// These listeners must be installed as soon as possible, otherwise the
// page may intercept and respond to events before Saka Key can.
//
// To accomplish this, the _loader script_ installs listeners that call
// window.handleDOMEvent. When the _full client_ loads, it then defines
// window.handleDOMEvent
//
// When an extension updates, Chrome cuts off content scripts from the
// rest of the extension. This breaks messaging, so commands that rely on
// messaging will silently stop working. To work around this, the client
// detects when messaging is cut off and removes its event listeners. The
// background page then loads in new clients that can handle events without
// interference from old event listeners.
import interceptedEventTypes from 'client/interceptedEventTypes';

function _handleDOMEvent (event) {
  window.handleDOMEvent(event);
}

export function addPreloadedEventListeners () {
  window.handleDOMEvent = () => {};
  interceptedEventTypes.forEach((eventType, i) => {
    window.addEventListener(eventType, _handleDOMEvent, true);
  });
  window.removePreloadedDOMEventListener = () => {
    window.handleDOMEvent = () => {};
    interceptedEventTypes.forEach((eventType) => {
      window.removeEventListener(eventType, _handleDOMEvent, true);
    });
    if (SAKA_DEBUG) console.log('Preloaded Event Listeners Removed');
  };
  if (SAKA_DEBUG) console.log('Preloaded Event Listeners Added');
}
