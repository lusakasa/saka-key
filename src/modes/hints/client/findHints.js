let detectByCursorStyle = false

export function setHintFindSettings (settings) {
  detectByCursorStyle = settings.hintDetectByCursorStyle
}

/** @type {WeakMap<HTMLElement, CSSStyleDeclaration>} */
let computedStyles

function demandComputedStyle (element) {
  if (computedStyles.has(element)) {
    return computedStyles.get(element)
  } else {
    const computedStyle = getComputedStyle(element)
    computedStyles.set(element, computedStyle)
    return computedStyle
  }
}

/**
 * Finds hints
 * @param {string} hintType - the type of elements to find (currently unused)
 */
export function findHints (hintType) {
  // on Firefox, getComputedStyle() may return null for conditions I don't fully understand
  // try-catch block prevents link hints generation from breaking.
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  try {
    // 1. getComputedStyle for every element
    const allElements = document.querySelectorAll(hintType)
    computedStyles = new WeakMap()
    // allElements.forEach((element) => computedStyles.set(element, getComputedStyle(element)));
    // 2. find hintable elements
    const hintableElements = []
    allElements.forEach(element => {
      if (isClickable(element)) {
        const rect = firstVisibleRect(element)
        if (rect) {
          const computedStyle = demandComputedStyle(element)
          hintableElements.push({
            element,
            rect: removeRectPaddingAndBorders(element, rect, computedStyle),
            computedStyle
          })
        }
      }
    })
    computedStyles = undefined
    if (SAKA_DEBUG) console.log(hintableElements)
    return hintableElements
  } catch (e) {
    return []
  }
}

// based on https://github.com/guyht/vimari/blob/master/vimari.safariextension/linkHints.js
function isClickable (element, computedStyle) {
  // clickable html elements
  switch (element.nodeName) {
    case 'A':
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true
    case 'INPUT':
      return element.type !== 'hidden'
  }
  // ARIA roles implying clickability
  switch (element.getAttribute('role')) {
    case 'button':
    case 'checkbox':
    case 'combobox':
    case 'link':
    case 'menuitem':
    case 'menuitemcheckbox':
    case 'menuitemradio':
    case 'radio':
    case 'tab':
    case 'textbox':
      return true
  }
  // other clickable conditions
  if (element.hasAttribute('onclick')) return true
  if (detectByCursorStyle) {
    const computedStyle = demandComputedStyle(element)
    if (
      computedStyle.cursor === 'pointer' &&
      (!element.parentElement ||
        demandComputedStyle(element.parentElement).cursor !== 'pointer')
    ) {
      return true
    }
  }
  return false
}

// based on https://github.com/guyht/vimari/blob/master/vimari.safariextension/linkHints.js
function isVisible (element, clientRect) {
  const computedStyle = demandComputedStyle(element)
  // remove elements that are barely within the viewport, tiny, or invisible
  switch (true) {
    case !clientRect:
    case clientRect.top < 0:
    case clientRect.top >= innerHeight - 4:
    case clientRect.left < 0:
    case clientRect.left >= innerWidth - 4:
    case clientRect.width < 3:
    case clientRect.height < 3:
    case computedStyle.visibility !== 'visible':
    case computedStyle.display === 'none':
      return false
  }

  // Eliminate elements hidden by another overlapping element.
  // To do that, get topmost element at some offset from upper-left corner of clientRect
  // and check whether it is the element itself or one of its descendants.
  // The offset is needed to account for coordinates truncation and elements with rounded borders.
  //
  // Coordinates truncation occurs when using zoom. In that case, clientRect coords should be float,
  // but we get integers instead. That makes so that elementFromPoint(clientRect.left, clientRect.top)
  // sometimes returns an element different from the one clientRect was obtained from.
  // So we introduce an offset to make sure elementFromPoint hits the right element.
  //
  // For elements with a rounded top-left border, the upper-left corner lies outside the element.
  // Then, we need an offset to get to the point nearest to the upper-left corner, but within border.
  const coordTruncationOffset = 2 // A value of 1 has been observed not to be enough,
  // so we heuristically choose 2, which seems to work well.
  // We know a value of 2 is still safe (lies within the element) because,
  // from the code above, width & height are >= 3.
  const radius = parseFloat(computedStyle.borderTopLeftRadius)
  const roundedBorderOffset = Math.ceil(radius * (1 - Math.sin(Math.PI / 4)))
  const offset = Math.max(coordTruncationOffset, roundedBorderOffset)
  if (offset >= clientRect.width || offset >= clientRect.height) {
    return false
  }
  let el = document.elementFromPoint(
    clientRect.left + offset,
    clientRect.top + offset
  )
  while (el && el !== element) {
    el = el.parentNode
  }
  if (!el) {
    return false
  }

  return true
}

/**
 * Given an element, returns its first bounding rectangle, if any.
 * Inline elements can have multiple bounding rectangles,
 * e.g. a paragraph that wraps to the next line.
 * @param {HTMLElement} element
 * @returns {rect?: ClientRect}
 */
function firstVisibleRect (element) {
  // Case 1. the element itself is visible
  for (const rect of element.getClientRects()) {
    if (isVisible(element, rect)) {
      return rect
    }
  }
  // Case 2. a child of the element is visible
  for (const child of element.children) {
    const childRect = firstVisibleRect(child)
    if (childRect) {
      return childRect
    }
  }
  // Case 3. there is no bounding rectangle
  return undefined
}

/**
 * Given an element, its ClientRect, and its computed style,
 * returns a ClientRect with padding and borders removed
 * @param {HTMLElement} element
 * @param {ClientRect} rect
 * @param {CSSStyleDeclaration} computedStyle
 * @returns {ClientRect}
 */
function removeRectPaddingAndBorders (element, rect, computedStyle) {
  const left =
    rect.left +
    parseFloat(computedStyle.paddingLeft) +
    parseFloat(computedStyle.borderLeftWidth)
  const right =
    rect.right -
    parseFloat(computedStyle.paddingRight) -
    parseFloat(computedStyle.borderRightWidth)
  const top =
    rect.top +
    parseFloat(computedStyle.paddingTop) +
    parseFloat(computedStyle.borderTopWidth)
  const bottom =
    rect.bottom -
    parseFloat(computedStyle.paddingBottom) -
    parseFloat(computedStyle.borderBottomWidth)
  return {
    left,
    right,
    top,
    bottom,
    width: right - left,
    height: bottom - top
  }
}
