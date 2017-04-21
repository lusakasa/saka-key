import Queue from 'promise-queue';
import { msg } from 'mosi/client';
import { Extension } from 'modes/extension/client';

/** The active mode of the Modes state machine */
let currentMode;
let modes = {};

/** Initializes the Modes state machine */
export function initModes (startMode, availableModes) {
  if (SAKA_DEBUG) console.log(`Start mode: ${startMode}`);
  currentMode = startMode;
  modes = availableModes;
}

export function setup () {
  Object.values(modes).forEach((mode) => {
    mode.onCreate();
  });
  msg(1, 'clientSettings');
  installEventListeners();
}

/** TODO: Adds an external extension. Not yet implemented */
export function addExtension (name) {
  modes[name] = new Extension(name);
}

/**
 * modeAction is called when a valid message is received by the client.
 * In a pure state machine, all events would be handled by the currently active mode.
 * Message handling in Saka Key violate this purity because the mode that handles
 * the message is pre-defined and independent of the active mode. For example, if
 * the current mode is COMMAND, but the user disables Saka Key from the popup,
 * a toggleEnable message will be received specifying mode BASIC, and mode BASIC's
 * toggleEnable handler will be called (and change the state to BASIC).
 * @param {string} mode - the mode that should handle the message
 * @param {string} action - the action to be called
 * @param {?any} arg - any arguments to be passed to the action
 * @param {number} src - the source of the message, usually ignored
 */
export async function modeAction ({ mode, action, arg }, src) {
  if (SAKA_DEBUG) {
    if (!modes[mode]) {
      throw Error(`Missing Mode ${mode}`);
    }
    if (!modes[mode].messages[action]) {
      throw Error(`Mode ${mode} is missing a handler for action ${action}`);
    }
  }
  const nextMode = await (modes[mode].messages[action](arg, src));
  if (nextMode) {
    setMode(nextMode, { type: 'message:' + action });
  }
}

/** Handles when messages containing updated settings are received */
export function clientSettings (settings) {
  if (SAKA_DEBUG) console.log('received settings: ', settings);
  if (typeof settings === 'string') {
    console.error('Failed to configure client settings: ', settings);
    return;
  }
  Object.entries(modes).forEach(([name, mode]) => {
    mode.onSettingsChange(settings);
  });
}

/**
 * Sets the active mode to a new mode.
 * If the active mode changes calls the old active mode's onExit() function,
 * then calls the new active modes's onEnter() function.
 * @param {string} nextMode
 */
async function setMode (nextMode, event) {
  if (SAKA_DEBUG && !nextMode) {
    throw Error(`Mode ${currentMode} is missing a handler for ${event.type} events`);
  }
  if (SAKA_DEBUG && !modes[nextMode]) {
    throw Error(`Event ${event.type} in mode ${currentMode} results in invalid next mode ${nextMode}`);
  }
  if (nextMode !== currentMode) {
    if (SAKA_DEBUG) {
      console.log(`changing mode from ${currentMode} to ${nextMode} on ${event.type} event:`, event);
    }
    await modes[currentMode].onExit(event);
    await modes[nextMode].onEnter(event);
  }
  currentMode = nextMode;
}

/**
 * A FIFO queue of functions returning promises with a concurrency limit of 1.
 * Only one function may execute at a time, other functions must wait
 */
const eventQueue = new Queue(1);

/**
 * Passes a DOM Event to the active mode for handling, potentially resulting in a
 * new mode. Event handlers are NOT executed immediately. Instead, the event  handler is
 * added to a FIFO promise queue that executes the handler at a head of the queue,
 * calculates the new mode, then executes the next handler with the updated new mode
 * and so on. This queue is necessary to avoid subtle concurrency bugs.
 * TODO: evaluate conditions under which event handlers in the queue expire
 * @param {DocumentEvent} event
 */
async function handleEvent (event) {
  eventQueue.add(async () => {
    const nextMode = await (modes[currentMode].events[event.type](event));
    await setMode(nextMode, event);
  });
}


/**
 * Installs event listeners for all events that should be handled by the active mode.
 * These listeners are installed once, as early as possible, to prevent visited pages
 * from installing listeners earlier that could interfere with Saka Key's event handling.
 * E.g. a web page that defines its own keyboard shortcuts will interfere with Saka Key.
 * Not all modes subscribe to all events. Their handlers for those events should simply
 * return the mode's name so that the mode is unchanged. If a mode needs to listen
 * for other types of events, it should add a listeners in its onEnter() function, and
 * remove those listeners in its onExit() function.
 */
function installEventListeners () {
  const eventTypes = [
    'keydown',
    'keypress',
    'keyup',
    'focusin',
    'focusout',
    'click',
    'mousedown'
  ];
  eventTypes.forEach((eventType) => {
    document.addEventListener(eventType, handleEvent, true);
  });
  // window.addEventListener('DOMContentLoaded', (event) => {
  //   if (SAKA_DEBUG) { console.log('DOMContentLoaded'); }
  //   document.activeElement && document.activeElement.blur && document.activeElement.blur();
  // });
  // window.addEventListener('load', (event) => {
  //   if (SAKA_DEBUG) { console.log('load'); }
  //   document.activeElement && document.activeElement.blur && document.activeElement.blur();
  // });
}
