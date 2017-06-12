/**
 * Given a DOM element, returns true if you can edit it with key presses or
 * if the element is of a type that should handle its own keypresses
 * (e.g. role=application for google docs/sheets)
 * TODO: work on case sensitivity
 * consider all the possible cases
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

// https://github.com/1995eaton/chromium-vim/blob/48226e1f86639dd2cbf18792fa078b7969da078f/content_scripts/dom.js
/**
 * Dispatch a mouse event to the target element
 * @param {HTMLElement} element
 * @param {'hover' | 'unhover' | 'click'} type
 * @param {{ ctrlKey, shiftKey, altKey, metaKey }} modifierKeys
 */
export function mouseEvent (element, type, modifierKeys = {}) {
  let events;
  switch (type) {
    case 'hover': events = ['mouseover', 'mouseenter']; break;
    case 'unhover': events = ['mouseout', 'mouseleave']; break;
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
