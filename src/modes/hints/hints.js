export function showHints () {
  console.log('showing hints');

}

export function hideHints () {
  console.log('hiding hints');
}

// the vimium algorithm for link hints`



// Returns all clickable elements that are not hidden and are in the current viewport, along with rectangles at which (parts of) the elements are displayed. In the process, we try to find rects where elements do not overlap so that link hints are unambiguous. Because of this, the rects returned will frequently *NOT* be equivalent to the rects for the whole element.
export function hintsInFrameAndViewport (requireHref = false) {
  if (!document.documentElement) throw Error('Cannot find link hints if documentElement is not ready');
  const elements = document.documentElement.getElementsByTagName('*');
  const visibleElements = [];

  for (const element of elements) {
    if (!requireHref || element.href) {
      const visibleElement = getVisibleClickable(element);
      visibleElements.push(visibleElement);
    }
  }
  visibleElements.reverse();

  const descendantsToCheck = [1, 2, 3];
  // const visibleElements = 
}

export function getVisibleClickable (element) {

}
