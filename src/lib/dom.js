/**
 * Given a DOM element, returns true if you can edit it with key presses.
 * TODO: work on case sensitivity
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
    } else if (element.contentEditable === 'true') {
      return true;
    }
    return false;
  }
  return false;
}

// https://github.com/1995eaton/chromium-vim/blob/48226e1f86639dd2cbf18792fa078b7969da078f/content_scripts/dom.js
export function mouseEvent (type, element) {
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
      detail: 1 // usually the click count
    });
    // TODO: # firefox synthetic click events apparently don't trigger default actions
    element.dispatchEvent(event);
  });
}
