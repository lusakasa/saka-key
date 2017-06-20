/**
 * Given a DOM element, returns true if you can edit it with key presses or
 * if the element is of a type that should handle its own keypresses
 * (e.g. role=application for google docs/sheets)
 * TODO: work on case sensitivity
 * consider all the possible cases
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function isTextEditable (element) {
  const textInputTypes = [ 'text', 'search', 'email', 'url', 'number', 'password', 'date', 'tel' ];
  if (element) {
    if (element.nodeName === 'INPUT') {
      if (!element.disabled && !element.readonly && (!element.type || textInputTypes.includes(element.type))) {
        return true;
      }
    } else if (element.nodeName === 'TEXTAREA') {
      return true;
    } else if (element.contentEditable.toUpperCase() === 'TRUE') {
      return true;
    // Although applications, e.g. google docs/sheets aren't necessarily text elements
    // they usually do their own key handling
    } else if (element.role === 'application') {
      return true;
    }
    return false;
  }
  return false;
}

/**
 * Dispatch a mouse event to the target element
 * based on cVim's implementation
 * @param {HTMLElement} element
 * @param {'hover' | 'unhover' | 'click'} type
 * @param {{ ctrlKey, shiftKey, altKey, metaKey }} modifierKeys
 */
export function mouseEvent (element, type, modifierKeys = {}) {
  let events;
  switch (type) {
    case 'hover': events = ['mouseover', 'mouseenter', 'mousemove']; break;
    case 'unhover': events = ['mousemove', 'mouseout', 'mouseleave']; break;
    case 'click': events = ['mouseover', 'mousedown', 'mouseup', 'click']; break;
  }
  events.forEach((type) => {
    const event = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
      detail: 1, // usually the click count
      ...modifierKeys
    });
    // TODO: # firefox synthetic click events apparently don't trigger default actions
    element.dispatchEvent(event);
  });
}

/**
 * TODO: use standard fullscreenchange event when browsers support it
 */
export const fullscreenchange = SAKA_PLATFORM === 'chrome'
    ? 'webkitfullscreenchange'
    : SAKA_PLATFORM === 'firefox'
      ? 'mozfullscreenchange'
      : 'fullscreenchange';
/**
 * Given a DOM event type that is vendor pre-fixed, e.g. 'mozfullscreenchange',
 * converts it to a standardized event type, e.g. 'fullscreenchange'
 * TODO: remove this if no vendor-prefixed events are needed
 * @param {string} event
 * @returns {string}
 */
export function normalizeEventType (type) {
  switch (type) {
    case fullscreenchange:
      return 'fullscreenchange';
    default:
      return type;
  }
}
