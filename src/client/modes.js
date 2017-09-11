import { isTextEditable, deepActiveElement, normalizeEventType } from 'lib/dom'
import interceptedEventTypes from './interceptedEventTypes'
import {
  passDOMEventToMiddleware,
  middlewareOnOptionsChange
} from './middleware'

/** The active mode of the Modes state machine */
let currentMode
let modes = {}
/** whether saka key is enabled or not */
let enabled = false

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
}

/** Initializes the Modes state machine */
export function initModes(startMode, availableModes, actions) {
  if (SAKA_DEBUG) console.log(`Start mode: ${startMode}`)
  currentMode = startMode
  Object.entries(availableModes).map(([name, mode]) => {
    modes[name] = Object.assign({}, defaultModeObject, mode)
    Object.assign(actions, wrapModeMessages(modes[name].messages))
  })
}

export let removeEventListeners
export function addEventListeners(clientType) {
  // event listeners must be added, except if the client is a content script on Chrome
  // for which the loader already added event listeners
  if (SAKA_PLATFORM === 'chrome' && clientType === 'content_script') {
    window.handleDOMEvent = handleDOMEvent
    removeEventListeners = window.removePreloadedDOMEventListener
  } else {
    addNormalEventListeners()
    removeEventListeners = removeNormalEventListeners
  }
}

function addNormalEventListeners() {
  Object.keys(interceptedEventTypes).forEach((eventType, i) => {
    window.addEventListener(eventType, handleDOMEvent, true)
  })
  if (SAKA_DEBUG) console.log('Normal Event Listeners Added')
}

function removeNormalEventListeners() {
  Object.keys(interceptedEventTypes).forEach(eventType => {
    window.removeEventListener(eventType, handleDOMEvent, true)
  })
  if (SAKA_DEBUG) console.log('Normal Event Listeners Removed')
}

/** Handles when messages containing updated options are received */
export function clientOptions(options) {
  if (options === undefined) {
    if (SAKA_DEBUG) {
      console.error('Received undefined client options')
    }
    return
  }
  if (typeof options === 'string') {
    console.error('Failed to configure client options: ', options)
    return
  }
  enabled = options.enabled
  Object.entries(modes).forEach(([name, mode]) => {
    mode.onOptionsChange(options)
  })
  middlewareOnOptionsChange(options)
  changeMode({
    mode: options.enabled ? 'Reset' : 'Disabled',
    type: 'clientOptions',
    options
  })
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
function modeNameTransform(name) {
  switch (name) {
    case 'Same':
      return currentMode
    case 'Reset':
      return isTextEditable(deepActiveElement()) ? 'Text' : 'Command'
    case 'TryText':
      return isTextEditable(deepActiveElement()) ? 'Text' : currentMode
    default:
      return name
  }
}

/**
 * Sets the active mode to a new mode.
 * If the active mode changes calls the old active mode's onExit() function,
 * then calls the new active modes's onEnter() function.
 * @param {string} nextMode
 */
function setMode(nextMode, event) {
  nextMode = modeNameTransform(nextMode)
  if (SAKA_DEBUG && !nextMode) {
    throw Error(
      `Mode ${currentMode} is missing a handler for ${event.type} events`
    )
  }
  if (SAKA_DEBUG && !modes[nextMode]) {
    throw Error(
      `Event ${event.type} in mode ${currentMode} results in invalid next mode ${nextMode}`
    )
  }
  if (nextMode !== currentMode) {
    if (SAKA_DEBUG) {
      const middlewareString = event.middleware
        ? ` :: via ${event.middleware} middleware`
        : ''
      console.log(
        `%c${event.type}: %c${currentMode} -> %c${nextMode}%c${middlewareString}`,
        'color: #2196F3;',
        'color: grey;',
        'color: #4CAF50;',
        'color: #FF4500;',
        event
      )
    }
    modes[currentMode].onExit(event)
    modes[nextMode].onEnter(event)
  }
  currentMode = nextMode
}

/**
 * Explicitly changes the modes. This function is declared so that
 * it can be called by any mode with msg(0, 'changeMode', { mode, why })
 * mode - the name of the new mode
 * why - a string explaining why the mode was changed
*/
export function changeMode(modeChangeEvent) {
  if (SAKA_DEBUG) {
    if (!modeChangeEvent.mode) {
      throw Error('Called changeMode but failed to provide a new mode')
    }
    if (!modeChangeEvent.type) {
      throw Error('Called changeMode but failed to provide a type')
    }
  }
  if (enabled) {
    setMode(modeChangeEvent.mode, modeChangeEvent)
  }
}

/**
 * @param {Event} event
 */
function handleDOMEvent(event) {
  if (enabled && (event.isTrusted || !interceptedEventTypes[event.type])) {
    const nextMode =
      passDOMEventToMiddleware(event) ||
      modes[currentMode][normalizeEventType(event.type)](event)
    setMode(nextMode, event)
  }
}

/**
 * In Mosi, actions are message endpoints that return a single value
 * that is returned to the source node on calls to get().
 * In Saka Key, messages may optionally change the mode by returning
 * an object of the form { nextMode: string, value: any }
 * @param {*} modeMessages 
 */
function wrapModeMessages(modeMessages) {
  const wrappedMessages = {}
  Object.entries(modeMessages).forEach(([name, message]) => {
    wrappedMessages[name] = wrapMessage(name, message)
  })
  return wrappedMessages
}

function wrapMessage(name, message) {
  return async function(arg, src) {
    if (enabled) {
      const result = await message(arg, src)
      if (result && result.nextMode) {
        setMode(result.nextMode, { type: `message: ${name}` })
      }
      return result && result.value
    }
  }
}
