import { behavior, scroll, scrollStep } from './utils';

export function scrollDown (event) {
  scroll(event.repeat, scrollStep, 'scrollTop');
}

export function scrollUp (event) {
  scroll(event.repeat, -scrollStep, 'scrollTop');
}

export function scrollLeft (event) {
  scroll(event.repeat, -scrollStep, 'scrollLeft');
}

export function scrollRight (event) {
  scroll(event.repeat, scrollStep, 'scrollLeft');
}

export function scrollPageDown () {
  scrollBy({
    top: innerHeight * 0.9,
    behavior
  });
}

export function scrollPageUp () {
  scrollBy({
    top: -innerHeight * 0.9,
    behavior
  });
}

export function scrollHalfPageDown () {
  scrollBy({
    top: innerHeight / 2,
    behavior
  });
}

export function scrollHalfPageUp () {
  scrollBy({
    top: -innerHeight / 2,
    behavior
  });
}

export function scrollToBottom () {
  scrollTo({
    top: document.documentElement.scrollHeight,
    behavior
  });
}

export function scrollToTop () {
  scrollTo({
    top: 0,
    behavior
  });
}

export function scrollToLeft () {
  scrollTo({
    left: 0,
    behavior
  });
}

export function scrollToRight () {
  scrollTo({
    left: document.documentElement.scrollWidth,
    behavior
  });
}
