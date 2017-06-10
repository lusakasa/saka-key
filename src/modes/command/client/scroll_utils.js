// TODO: the implementation below makes me feel guilty... but there's no better way
/** returns true if an element scrolls vertically, false otherwise */
export function scrollsVertically (element) {
  const yStart = element.scrollTop;
  element.scrollTop += 1;
  const yAfterScrollDown = element.scrollTop;
  element.scrollTop -= 1;
  const yAfterScrollUp = element.scrollTop;
  return yStart !== yAfterScrollDown || yStart !== yAfterScrollUp;
}

export function calculateCurrentScrollElement () {
  let scrollElement = largestScrollableElement();
  if (scrollElement === undefined) {
    scrollElement = guessScrollElement();
    if (SAKA_DEBUG) {
      console.log('No scrollElement candidate, defaulting to: ', scrollElement);
    }
  } else if (SAKA_DEBUG) {
    console.log('scrollElement changed to: ', scrollElement);
  }
  return scrollElement;
}

function guessScrollElement () {
  return document.scrollingElement || document.body || document.documentElement;
}

/**
 * Returns the largest scrollable element that is the root element or one of
 * its children  operates by analyzing dimnsions/scrollability of all nodes
 * up to depth levels down in hierarchy
 * @param {HTMLElement} element - the root element
 * @param {number} depth - the maximum depth, pass -1 to indicate no limit,
 * depth = 8 is just large enough for gmail
 */
function largestScrollableElementTopDown (element = guessScrollElement(), depth = 8) {
  function _largestScrollableElementTopDown (element, depth) {
    if (depth === 0) return;
    if (!element) return;
    if (getComputedStyle(element).overflow === 'hidden') return;
    if (scrollsVertically(element)) {
      const rect = element.getBoundingClientRect();
      const area = rect.width * rect.height;
      return [element, area];
    }
    let largestFound;
    [...element.children]
      .map((child) => _largestScrollableElementTopDown(child, depth - 1))
      .forEach((scrollElementInfo) => {
        if (scrollElementInfo) {
          if (!largestFound) {
            largestFound = scrollElementInfo;
          } else {
            if (scrollElementInfo[1] > largestFound[1]) {
              largestFound = scrollElementInfo;
            }
          }
        }
      });
    return largestFound;
  }
  const scrollInfo = _largestScrollableElementTopDown(element, depth);
  return scrollInfo && scrollInfo[0];
}

/**
 * Returns the largest scrollabel element that is the root element or one of
 * its children. Works by finding the element in the middle of the page,
 * tracing it up to the root, then walking down until a scrollable elemnt is found
 */
function largestScrollableElementBottomUp () {
  const middleChild = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
  if (!middleChild) return;
  function firstScrollingAncestor (element) {
    if (!element) return;
    return firstScrollingAncestor(element.parentElement) ||
      (scrollsVertically(element) && element);
  }
  return firstScrollingAncestor(middleChild) || undefined;
}

function largestScrollableElement () {
  return largestScrollableElementTopDown() || largestScrollableElementBottomUp();
}
