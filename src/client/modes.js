import Queue from 'promise-queue';
import { msg } from 'mosi/client';
import { isTextEditable, deepActiveElement, normalizeEventType } from 'lib/dom';
import { installEventListeners } from './installEventListeners';
import {
  passDOMEventToMiddleware,
  passMessageToMiddleware,
  middlewareOnOptionsChange
} from './middleware';

/** The active mode of the Modes state machine */
let currentMode;
let modes = {};
/** whether saka key is enabled or not */
let enabled = false;

const defaultModeObject = {
  onEnter: () => {},
  onExit: () => {},
  onOptionsChange: () => {},
  keydown: () => 'Same',
  keypress: () => 'Same',
  keyup: () => 'Same',
  blur: () => 'Same',
  focus: () => 'Same',
  click: () => 'Same',
  mousedown: () => 'Same',
  fullscreenchange: () => 'Same',
  messages: {}
};

/** Initializes the Modes state machine */
export function initModes (startMode, availableModes) {
  if (SAKA_DEBUG) console.log(`Start mode: ${startMode}`);
  currentMode = startMode;
  Object.keys(availableModes).map((name) => {
    modes[name] = Object.assign({}, defaultModeObject, availableModes[name]);
  });
}

export function setup (clientType) {
  msg(1, 'clientOptions');
  if (clientType !== 'content_script') {
    installEventListeners();
  }
  window.handleDOMEvent = handleDOMEvent;
}

/** Handles when messages containing updated options are received */
export function clientOptions (options) {
  if (options === undefined) {
    if (SAKA_DEBUG) {
      console.error('Received undefined client options');
    }
    return;
  }
  if (typeof options === 'string') {
    console.error('Failed to configure client options: ', options);
    return;
  }
  enabled = options.enabled;
  Object.entries(modes).forEach(([name, mode]) => {
    mode.onOptionsChange(options);
  });
  middlewareOnOptionsChange(options);
  changeMode({
    mode: options.enabled ? 'Reset' : 'Basic',
    type: 'clientOptions',
    options
  });
}

/**
 * Transforms a reserved mode name to an actual mode name.
 * For regular mode names, returns the name unchanged.
 * Reserved mode names:
 * * Same - returns the active mode name
 * * Reset - returns either Command or Text, depending on deepActiveElement
 * * TryText - if deepActiveElement is a text input, returns Text. 
 *   Otherwise returns the active mode name
 * @param {string} name
 * @returns {string}
 */
function modeNameTransform (name) {
  switch (name) {
    case 'Same':
      return currentMode;
    case 'Reset':
      return isTextEditable(deepActiveElement())
        ? 'Text'
        : 'Command';
    case 'TryText':
      return isTextEditable(deepActiveElement())
        ? 'Text'
        : currentMode;
    default:
      return name;
  }
}

/**
 * Sets the active mode to a new mode.
 * If the active mode changes calls the old active mode's onExit() function,
 * then calls the new active modes's onEnter() function.
 * @param {string} nextMode
 */
function setMode (nextMode, event) {
  nextMode = modeNameTransform(nextMode);
  if (SAKA_DEBUG && !nextMode) {
    throw Error(`Mode ${currentMode} is missing a handler for ${event.type} events`);
  }
  if (SAKA_DEBUG && !modes[nextMode]) {
    throw Error(`Event ${event.type} in mode ${currentMode} results in invalid next mode ${nextMode}`);
  }
  if (nextMode !== currentMode) {
    if (SAKA_DEBUG) {
      const middlewareString = event.middleware ? ` :: via ${event.middleware} middleware` : '';
      console.log(`%c${event.type}: %c${currentMode} -> %c${nextMode}%c${middlewareString}`,
        'color: #2196F3;', 'color: grey;', 'color: #4CAF50;', 'color: #FF4500;', event);
    }
    modes[currentMode].onExit(event);
    modes[nextMode].onEnter(event);
  }
  currentMode = nextMode;
}

/**
 * A FIFO queue of event handling functions returning promises with a concurrency
 * limit of 1. Only one handler may execute at a time, other functions must wait.
 * An event may be either
 * 1. A DOM event
 * 2. A message
 * 3. An explicit mode change via changeMode()
 */
const eventQueue = new Queue(1);

/**
 * Explicitly changes the modes. This function is declared so that
 * it can be called by any mode with msg(0, 'changeMode', { mode, why })
 * mode - the name of the new mode
 * why - a string explaining why the mode was changed
*/
export function changeMode (modeChangeEvent) {
  if (SAKA_DEBUG) {
    if (!modeChangeEvent.mode) {
      throw Error('Called changeMode but failed to provide a new mode');
    }
    if (!modeChangeEvent.type) {
      throw Error('Called changeMode but failed to provide a type');
    }
  }
  if (enabled) {
    eventQueue.add(() => {
      setMode(modeChangeEvent.mode, modeChangeEvent);
    });
  }
}

/**
 * Passes an event to the active mode for handling, potentially resulting in a
 * new mode. Event handlers are NOT executed immediately. Instead, the event  handler is
 * added to a FIFO promise queue that executes the handler at a head of the queue,
 * calculates the new mode, then executes the next handler with the updated new mode
 * and so on. This queue is necessary to avoid subtle concurrency bugs.
 * TODO: evaluate conditions under which event handlers in the queue expire
 * @param {DocumentEvent} event
 */
function handleDOMEvent (event) {
  if (enabled) {
    const nextMode = passDOMEventToMiddleware(event) ||
      (modes[currentMode][normalizeEventType(event.type)](event));
    setMode(nextMode, event);
  }
};

/**
 * modeMessage is called when a valid message is received by the client.
 * In a pure state machine, all events would be handled by the currently active mode.
 * Message handling in Saka Key violate this purity because the mode that handles
 * the message is pre-defined and independent of the active mode.
 * @param {string} mode - the mode that should handle the message
 * @param {string} action - the action to be called
 * @param {?any} arg - any arguments to be passed to the action
 * @param {number} src - the source of the message, usually ignored
 */
export function modeMessage ({ mode, action, arg }, src) {
  if (enabled) {
    return new Promise((resolve) => {
      eventQueue.add(async () => {
        if (SAKA_DEBUG) {
          if (!modes[mode]) {
            throw Error(`Missing Mode ${mode}`);
          }
          if (!modes[mode].messages[action]) {
            throw Error(`Mode ${mode} is missing a handler for action ${action}`);
          }
        }
        const result = await passMessageToMiddleware(action, arg, src) ||
          await (modes[mode].messages[action](arg, src));
        if (result && result.nextMode) {
          setMode(result.nextMode, { type: 'message:' + action });
        }
        resolve(result && result.value);
      });
    });
  }
}
