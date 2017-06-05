import { detectByCursorStyle } from './index';

export function findHints () {
  const candidates = [];
  for (const element of document.querySelectorAll('*')) {
    if (isClickable(element)) {
      const rect = firstVisibleRect(element);
      if (rect) {
        candidates.push({element, rect});
      }
    }
  }
  return candidates;
}

// https://github.com/guyht/vimari/blob/master/vimari.safariextension/linkHints.js
function isClickable (element) {
  var name = element.nodeName.toLowerCase();
  var role = element.getAttribute('role');

  return (
    // normal html elements that can be clicked
    name === 'a' ||
    name === 'button' ||
    name === 'input' && element.getAttribute('type') !== 'hidden' |
    name === 'select' |
    name === 'textarea' ||
    // elements having an ARIA role implying clickability
    // (see http://www.w3.org/TR/wai-aria/roles#widget_roles)
    role === 'button' ||
    role === 'checkbox' ||
    role === 'combobox' ||
    role === 'link' ||
    role === 'menuitem' ||
    role === 'menuitemcheckbox' ||
    role === 'menuitemradio' ||
    role === 'radio' ||
    role === 'tab' ||
    role === 'textbox' ||
    // other ways by which we can know an element is clickable
    element.hasAttribute('onclick') ||
    detectByCursorStyle && window.getComputedStyle(element).cursor === 'pointer' &&
      (!element.parentNode ||
       window.getComputedStyle(element.parentNode).cursor !== 'pointer')
  );
}


// https://github.com/guyht/vimari/blob/master/vimari.safariextension/linkHints.js
function isVisible (element, clientRect) {
  // Exclude links which have just a few pixels on screen, because the link hints won't show for them anyway.
  if (!clientRect ||
    clientRect.top < 0 ||
    clientRect.top >= window.innerHeight - 4 ||
    clientRect.left < 0 ||
    clientRect.left >= window.innerWidth - 4) {
    return false;
  }

  if (clientRect.width < 3 || clientRect.height < 3) {
    return false;
  }

  // eliminate invisible elements (see test_harnesses/visibility_test.html)
  var computedStyle = window.getComputedStyle(element, null);
  if (computedStyle.getPropertyValue('visibility') !== 'visible' ||
    computedStyle.getPropertyValue('display') === 'none') {
    return false;
  }

  // Eliminate elements hidden by another overlapping element.
  // To do that, get topmost element at some offset from upper-left corner of clientRect
  // and check whether it is the element itself or one of its descendants.
  // The offset is needed to account for coordinates truncation and elements with rounded borders.
  //
  // Coordinates truncation occcurs when using zoom. In that case, clientRect coords should be float,
  // but we get integers instead. That makes so that elementFromPoint(clientRect.left, clientRect.top)
  // sometimes returns an element different from the one clientRect was obtained from.
  // So we introduce an offset to make sure elementFromPoint hits the right element.
  //
  // For elements with a rounded topleft border, the upper left corner lies outside the element.
  // Then, we need an offset to get to the point nearest to the upper left corner, but within border.
  const coordTruncationOffset = 2; // A value of 1 has been observed not to be enough,
                                 // so we heuristically choose 2, which seems to work well.
                                 // We know a value of 2 is still safe (lies within the element) because,
                                 // from the code above, widht & height are >= 3.
  const radius = parseFloat(computedStyle.borderTopLeftRadius);
  const roundedBorderOffset = Math.ceil(radius * (1 - Math.sin(Math.PI / 4)));
  const offset = Math.max(coordTruncationOffset, roundedBorderOffset);
  if (offset >= clientRect.width || offset >= clientRect.height) {
    return false;
  }
  let el = document.elementFromPoint(clientRect.left + offset, clientRect.top + offset);
  while (el && el !== element) {
    el = el.parentNode;
  }
  if (!el) {
    return false;
  }

  return true;
}


/**
 * Given an element, returns its first bounding rectangle, if any.
 * Inline elements can have multiple bounding rectangles,
 * e.g. a paragraph that wraps to the next line.
 * @param {HTMLElement} element
 * @returns {rect: ClientRect}
 */
function firstVisibleRect (element) {
  // Case 1. the element itself is visible
  for (const rect of element.getClientRects()) {
    if (isVisible(element, rect)) {
      return rect;
    }
  }
  // Case 2. a child of the element is visible
  for (const child of element.children) {
    var childRect = firstVisibleRect(child);
    if (childRect) {
      return childRect;
    }
  }
  // Case 3. there is no bounding rectangle
  return undefined;
}
