// TODO: in progress port of VimFX's algorithm for finding hintable elements.

// based on the VimFX algorithm
function findHints (filter, selector = '*') {
  const viewport = getWindowViewport();
  let wrappers = [];
  getMarkableElements(viewport, wrappers, filter, selector);
  return wrappers;
};

// `filter` is a function that is given every element in every frame of the page.
// It should return wrapper objects for markable elements and a falsy value for
// all other elements. All returned wrappers are added to `wrappers`. `wrappers`
// is modified instead of using return values to avoid array concatenation for
// each frame. It might sound expensive to go through _every_ element, but that’s
// actually what other methods like using XPath or CSS selectors would need to do
// anyway behind the scenes. However, it is possible to pass in a CSS selector,
// which allows getting markable elements in several passes with different sets
// of candidates.
export function getMarkableElements (viewport, wrappers, filter, selector, parents = []) {
  const hintableElements = [];
  document.querySelectorAll('*').forEach((element) => {
    // `getRects` is fast and filters out most elements, so run it first of all.
    const rects = getRects(element, viewport);
    if (rects.insideViewport.length) {
      const hintableElement = filter(
        element,
        (elementArg, tryRight = 1) => getElementShape(
          { viewport, parents, element: elementArg },
          tryRight,
          elementArg === element ? rects : null
        )
      );
      if (hintableElement) {
        hintableElements.push(hintableElement);
      }
    }
  });

  for (let frame of Array.from(window.frames)) {
    if (frame.frameElement) {
      var result;
      if (!(result = viewportUtils.getFrameViewport(
        frame.frameElement, viewport
      ))) { continue; }
      let {viewport: frameViewport, offset} = result;
      getMarkableElements(
        frame, frameViewport, wrappers, filter, selector,
        parents.concat({window, offset})
      );
    }
  }

  return hintableElements;
}

function getRects (element, viewport) {
  // `element.getClientRects()` returns a list of rectangles, usually just one,
  // which is identical to the one returned by `element.getBoundingClientRect()`.
  // However, if `element` is inline and line-wrapped, then it returns one
  // rectangle for each line, since each line may be of different length, for
  // example. That allows us to properly add hints to line-wrapped links.
  const rects = element.getClientRects();
  return {
    all: rects,
    insideViewport: Array.filter(
      rects,
      (rect) => isInsideViewport(rect, viewport)
    )
  };
}

function getRootElement () {
  return (document.compatMode === 'BackCompat' && document.body) || document.documentElement;
}

function getWindowViewport () {
  // clientWidth and clientHeight are viewport size excluding scrollbars
  const { clientWidth, clientHeight, scrollWidth, scrollHeight } = getRootElement();
  // innerWidth and innerHeight are viewport size including scrollbars.
  const {innerWidth, innerHeight} = window;
  // When there are no scrollbars `clientWidth` and `clientHeight` might be too
  // small. Then we use `innerWidth` and `innerHeight` instead.
  const width = scrollWidth > innerWidth ? clientWidth : innerWidth;
  const height = scrollHeight > innerHeight ? clientHeight : innerHeight;
  return {
    left: 0,
    top: 0,
    right: width,
    bottom: height,
    width,
    height
  };
};

const MIN_EDGE_DISTANCE = 4;
function isInsideViewport (rect, viewport) {
  return (
    rect.left <= viewport.right - MIN_EDGE_DISTANCE &&
    rect.top <= viewport.bottom - MIN_EDGE_DISTANCE &&
    rect.right >= viewport.left + MIN_EDGE_DISTANCE &&
    rect.bottom >= viewport.top + MIN_EDGE_DISTANCE
  );
}

// Returns the “shape” of an element:
//
// - `nonCoveredPoint`: The coordinates of the first point of the element that
//   isn’t covered by another element (except children of the element). It also
//   contains the offset needed to make those coordinates relative to the top
//   frame, as well as the rectangle that the coordinates occur in. It is `null`
//   if the element is outside `viewport` or entirely covered by other elements.
// - `area`: The area of the part of the element that is inside the viewport.
// - `width`: The width of the visible rect at `nonCoveredPoint`.
// - `textOffset`: The distance between the left edge of the element and the left
//   edge of its text vertically near `nonCoveredPoint`. Might be `null`. The
//   calculation might stop early if `isBlock`.
// - `isBlock`: `true` if the element is a block and has several lines of text
//   (which is the case for “cards” with an image to the left and a title as well
//   as some text to the right (where the entire “card” is a link)). This is used
//   to place the the marker at the edge of the block.
function getElementShape (elementData, tryRight, rects = getRects(element, viewport)) {
  const { viewport, element } = elementData;
  const result = { nonCoveredPoint: null, area: 0, width: 0, textOffset: null, isBlock: false };
  let rect, visibleRect;
  let totalArea = 0;
  const visibleRects = [];
  for (let index = 0; index < rects.insideViewport.length; index++) {
    rect = rects.insideViewport[index];
    visibleRect = adjustRectToViewport(rect, viewport);
    if (visibleRect.area === 0) { continue; }
    visibleRect.index = index;
    totalArea += visibleRect.area;
    visibleRects.push(visibleRect);
  }

  if (visibleRects.length === 0) {
    if ((rects.all.length === 1) && (totalArea === 0)) {
      [rect] = Array.from(rects.all);
      if ((rect.width > 0) || (rect.height > 0)) {
        // If we get here, it means that everything inside `element` is floated
        // and/or absolutely positioned (and that `element` hasn’t been made to
        // “contain” the floats). For example, a link in a menu could contain a
        // span of text floated to the left and an icon floated to the right.
        // Those are still clickable. Therefore we return the shape of the first
        // visible child instead. At least in that example, that’s the best bet.
        for (let child of Array.from(element.children)) {
          let childData = Object.assign({}, elementData, {element: child});
          let shape = getElementShape(childData, tryRight);
          if (shape) { return shape; }
        }
      }
    }
    return result;
  }

  result.area = totalArea;

  // Even if `element` has a visible rect, it might be covered by other elements.
  let nonCoveredPoint = null;
  let nonCoveredPointRect = null;
  for (visibleRect of Array.from(visibleRects)) {
    nonCoveredPoint = getFirstNonCoveredPoint(
      elementData, visibleRect, tryRight
    );
    if (nonCoveredPoint) {
      nonCoveredPointRect = visibleRect;
      break;
    }
  }

  if (!nonCoveredPoint) { return result; }
  result.nonCoveredPoint = nonCoveredPoint;

  result.width = nonCoveredPointRect.width;

  let lefts = [];
  let smallestBottom = Infinity;
  let hasSingleRect = (rects.all.length === 1);

  utils.walkTextNodes(element, function(node) {
    if (node.data.trim() !== '') {
      for (let {bounds} of Array.from(node.getBoxQuads())) {
        if ((bounds.width < MIN_TEXTNODE_SIZE) || (bounds.height < MIN_TEXTNODE_SIZE)) {
          continue;
        }

        if (utils.overlaps(bounds, nonCoveredPointRect)) {
          lefts.push(bounds.left);
        }

        if (hasSingleRect) {
          // The element is likely a block and has several lines of text; ignore
          // the `textOffset` (see the description of `textOffset` at the
          // beginning of the function).
          if (bounds.top > smallestBottom) {
            result.isBlock = true;
            return true;
          }

          if (bounds.bottom < smallestBottom) {
            smallestBottom = bounds.bottom;
          }
        }
      }
    }

    return false;
  });

  if (lefts.length > 0) {
    result.textOffset =
      Math.round(Math.min(...Array.from(lefts || [])) - nonCoveredPointRect.left);
  }

  return result;
};
