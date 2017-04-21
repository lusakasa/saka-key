import Queue from 'promise-queue';
import { msg } from 'mosi/client';
import { isTextEditable } from 'lib/dom';
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

/** Handles when messages containing updated settings are received */
export function clientSettings (settings) {
  if (typeof settings === 'string') {
    console.error('Failed to configure client settings: ', settings);
    return;
  }
  Object.entries(modes).forEach(([name, mode]) => {
    mode.onSettingsChange(settings);
  });
  changeMode({
    mode: settings.enabled ? 'Reset' : 'Basic',
    reason: 'clientSettings'
  });
}

/**
 * Transforms a reserved mode name to an actual mode name.
 * For regular mode names, returns the name unchanged.
 * Reserved mode names:
 * * Same - returns the active mode name
 * * Reset - returns either Command or Text, depending on document.activeElement
 * * TryText - if document.activeElement is a text input, returns Text. 
 *   Otherwise returns the active mode name
 * @param {string} name
 */
function modeNameTransform (name) {
  switch (name) {
    case 'Same':
      return currentMode;
    case 'Reset':
      if (isTextEditable(document.activeElement)) {
        return 'Text';
      }
      return 'Command';
    case 'TryText':
      if (isTextEditable(document.activeElement)) {
        return 'Text';
      }
      return currentMode;
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
async function setMode (nextMode, event) {
  nextMode = modeNameTransform(nextMode);
  if (SAKA_DEBUG && !nextMode) {
    throw Error(`Mode ${currentMode} is missing a handler for ${event.type} events`);
  }
  if (SAKA_DEBUG && !modes[nextMode]) {
    throw Error(`Event ${event.type} in mode ${currentMode} results in invalid next mode ${nextMode}`);
  }
  if (nextMode !== currentMode) {
    if (SAKA_DEBUG) {
      console.log(`%c${event.type}: %c${currentMode} -> %c${nextMode}`,
        'color: #2196F3;', 'color: grey;', 'color: #4CAF50;', event);
    }
    await modes[currentMode].onExit(event);
    await modes[nextMode].onEnter(event);
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
export function changeMode ({ mode, reason }) {
  if (SAKA_DEBUG) {
    if (!mode) {
      console.error('Called changeMode but failed to provide a new mode');
    }
    if (!reason) {
      console.error('Called changeMode but failed to provide a reason');
    }
  }
  eventQueue.add(async () => {
    await setMode(mode, { type: reason });
  });
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
async function handleDOMEvent (event) {
  eventQueue.add(async () => {
    const nextMode = await (modes[currentMode].events[event.type](event));
    await setMode(nextMode, event);
  });
}

/**
 * modeMessage is called when a valid message is received by the client.
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
export async function modeMessage ({ mode, action, arg }, src) {
  eventQueue.add(async () => {
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
    document.addEventListener(eventType, handleDOMEvent, true);
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
