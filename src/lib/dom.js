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
};