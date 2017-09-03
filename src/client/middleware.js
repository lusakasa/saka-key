// simple middleware that intercepts events/messages before the active mode/messaged mode
// though of a stack of handlers... but that's complex and for now isn't needed

import { normalizeEventType } from 'lib/dom';
import { handleFullscreenChange } from './gui';

let preventStealFocus;
let hasInteractedWithPage = false;

const middleware = {
  onOptionsChange: (options) => {
    preventStealFocus = options.preventStealFocus;
    if (!hasInteractedWithPage && preventStealFocus) {
      document.activeElement && document.activeElement.blur();
    }
  },
  events: {
    keydown: () => undefined,
    keypress: () => undefined,
    keyup: () => undefined,
    blur: () => undefined,
    focus: (event) => {
      if (preventStealFocus && (hasInteractedWithPage === false)) {
        event.target.blur();
        return 'Same';
      }
    },
    click: (event) => {
      hasInteractedWithPage = true;
    },
    mousedown: (event) => {
      hasInteractedWithPage = true;
    },
    fullscreenchange: (event) => {
      handleFullscreenChange(event);
    }
  }
  // NOTE: message middleware doesn't make sense because all messages are targeted
  // to a specific mode, whereas DOM events can be handled by any mode
};

export function middlewareOnOptionsChange (options) {
  middleware.onOptionsChange(options);
}

export function passDOMEventToMiddleware (event) {
  const nextMode = middleware.events[normalizeEventType(event.type)](event);
  if (SAKA_DEBUG && nextMode) {
    event.middleware = 'generic';
  }
  return nextMode;
}
