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
  if (element) {
    switch (element.nodeName) {
      case 'INPUT':
        return isEditableHTMLInput(element);
      case 'TEXTAREA':
      case 'OBJECT':
        return true;
    }
    switch (true) {
      case element.contentEditable.toUpperCase() === 'TRUE':
      case element.role === 'application':
        return true;
    }
  }
  return false;
}

/**
 * Returns whether the passed HTML input element is editable
 * @param {HTMLInputElement} element
 */
function isEditableHTMLInput (element) {
  if (element.disabled || element.readonly) return false;
  switch (element.type) {
    case undefined:
    case 'text':
    case 'search':
    case 'email':
    case 'url':
    case 'number':
    case 'password':
    case 'date':
    case 'tel':
      return true;
  }
  return false;
}

/**
 * Like document.activeElement, but penetrates through Shadow DOM
 * A good example is: https://web.archive.org/web/20170621214451/https://material.io/icons/
 * Click on the input. document.activeElement is different from deepActiveElement()
 * @param {HTMLElement} root
 */
export function deepActiveElement (root = document) {
  const activeElement = root.activeElement;
  const activeElementShadowRoot = activeElement && activeElement.shadowRoot;
  return activeElementShadowRoot
    ? deepActiveElement(activeElementShadowRoot)
    : activeElement;
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

// TODO: figure out why elements within shadow roots aren't registered as
// visible/clickable, then start using this method
/**
 * Given an HTML Element, returns a list of all elements within
 * penetrating the shadow DOM
 * @param {HTMLElement} root
 */
export function getAllElementsIncludingShadowDOM (root = document) {
  const allElements = root.querySelectorAll('*');
  let shadowDescendents = [];
  allElements.forEach((element) => {
    if (element.shadowRoot) {
      shadowDescendents = [
        ...shadowDescendents,
        ...getAllElementsIncludingShadowDOM(element.shadowRoot)];
    }
  });
  return [...allElements, shadowDescendents];
}

/**
 * Copies the specified text to the clipboard
 * @param {string} text
 */
export function copy (text) {
  const textArea = document.createElement('textarea');
  textArea.style = 'position:fixed;right:0';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('Copy');
  document.body.removeChild(textArea);
}

/**
 * Returns the clipboard contents.
 * This method is only callable from the background page and requires
 * the "clipboardRead" permission to be declared in manifest.json
 * @returns {string}
 */
export function paste () {
  const textArea = document.createElement('textarea');
  textArea.style = 'position:fixed;right:0';
  document.body.appendChild(textArea);
  textArea.focus();
  document.execCommand('Paste');
  const value = textArea.value;
  document.body.removeChild(textArea);
  return value;
}
