require('smoothscroll-polyfill').polyfill();

// TODO: Replace smoothscroll-polyfill implementation with a custom implementation
// Currently, scroll down, left, right, up use small custom scroll implementation
// but scroll page/half page uses polyfill, which is large and only scrolls documentElement

let lastAnimationFrame;
let scrollStep = 20;
let scroll = scrollSmooth;
let behavior = 'smooth';

export function initScrolling (_smoothScroll, _scrollStep) {
  scrollStep = _scrollStep;
  scroll = _smoothScroll ? scrollSmooth : scrollRegular;
  behavior = _smoothScroll ? 'smooth' : 'instant';
}

/**
 * Scrolls the selected element smoothly. Works around the quirks of keydown events.
 * The first time a key is pressed (and held), a keydown event is fired immediately.
 * After that, there is a delay before the 2nd keydown event is fired.
 * The 3rd and all subsequent keydown events fire in rapid succession.
 * event.repeat is false for the first keydown event, but true for all others
 * The delay (70 and 500) are carefully selected to keep scrolling smooth but
 * prevent unexpected scrolling after the user has released the scroll key.
 * Relying on keyup events exclusively to stop scrolling is unreliable.
 */
function scrollSmooth (element, repeat, step, direction) {
  cancelAnimationFrame(lastAnimationFrame);
  let startTime;
  const delay = repeat ? 70 : 500;
  const doScroll = (curTime) => {
    startTime = startTime || curTime;
    element[direction] += step;
    if (curTime - startTime < delay) {
      lastAnimationFrame = requestAnimationFrame(doScroll);
    } else {
      cancelAnimationFrame(lastAnimationFrame);
    }
  };
  requestAnimationFrame(doScroll);
};

/**
 * cancelScroll should be called when the user releases the scroll key to stop the
 * smooth scrolling process. Otherwise, scrolling would unexpectedly continue.
 */
export function cancelScroll () {
  cancelAnimationFrame(lastAnimationFrame);
}

/**
 * Scrolls the selected element immediately
 */
function scrollRegular (element, repeat, step, direction) {
  element[direction] += step;
}

/** Scroll down page by a single step */
export function scrollDown (event) {
  scroll(document.scrollingElement, event.repeat, scrollStep, 'scrollTop');
}

/** Scroll up page by a single step */
export function scrollUp (event) {
  scroll(document.scrollingElement, event.repeat, -scrollStep, 'scrollTop');
}

/** Scroll left page by a single step */
export function scrollLeft () {
  scroll(document.scrollingElement, event.repeat, -scrollStep, 'scrollLeft');
}

/** Scroll right page by a single step */
export function scrollRight () {
  scroll(document.scrollingElement, event.repeat, scrollStep, 'scrollLeft');
}

// TODO: figure out why document.documentElement.clientHeight
// is buggy on hackernews, i wouldd use it over innerHeight otherwise
/** Scroll down one page */
export function scrollPageDown () {
  scrollBy({
    top: innerHeight * 0.9,
    behavior
  });
}

/** Scroll up one page */
export function scrollPageUp () {
  scrollBy({
    top: -innerHeight * 0.9,
    behavior
  });
}

/** Scroll down half a page */
export function scrollHalfPageDown () {
  scrollBy({
    top: innerHeight / 2,
    behavior
  });
}

/** Scroll up half a page */
export function scrollHalfPageUp () {
  scrollBy({
    top: -innerHeight / 2,
    behavior
  });
}

/** Scroll to bottom of page */
export function scrollToBottom () {
  scrollTo({
    top: document.documentElement.scrollHeight,
    behavior
  });
}

/** Scroll to top page */
export function scrollToTop () {
  scrollTo({
    top: 0,
    behavior
  });
}

/** Scroll to far left of page */
export function scrollToLeft () {
  scrollTo({
    left: 0,
    behavior
  });
}

/** Scroll to far right of page */
export function scrollToRight () {
  scrollTo({
    left: document.documentElement.scrollWidth,
    behavior
  });
}
