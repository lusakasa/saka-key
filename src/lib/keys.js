import friendlyCodeStrings from './friendlyCodeStrings.json'

export const isMac = navigator.appVersion.indexOf('Mac') !== -1

let _physicalKeys = true
let _ignoreModifierKeys = false

/**
 * Configure how keyboard bindings should be interpreted and displayed
 * Options:
 * 1. physicalKeys = false: use event.code + modifierKeys
 * 2. physicalKeys = true && ignoreModifierKeys = false: use event.key + modifierKeys
 * 3. physicalKeys = true && ignoreModifierKeys = true: use event.key
 * @param {boolean} physicalKeys_
 * @param {boolean} ignoreModifierKeys_
 */
export function setKeyboardSettings (physicalKeys, ignoreModifierKeys) {
  _physicalKeys = physicalKeys
  _ignoreModifierKeys = ignoreModifierKeys
}

/**
 * Returns true if the given keyboard event is ONLY a modifier key, false otherwise
 * @param {KeyboardEvent} event
 * @returns {boolean}
 */
export function isModifierKey (event) {
  switch (event.key) {
    case 'Shift':
    case 'Control':
    case 'Alt':
    case 'Meta':
      return true
    default:
      return false
  }
}

/**
 * Given a keyboard event, returns a string representation of its modifiers
 * @param {KeyboardEvent} event
 * @returns {string}
 */
function modifierString (event) {
  const { shiftKey: s, ctrlKey: c, altKey: a, metaKey: m } = event
  return `${s ? 's' : ''}${c ? 'c' : ''}${a ? 'a' : ''}${m ? 'm' : ''}`
}

/**
 * Converts a KeyboardEvent to its string representation use for internal processing
 * @param {KeyboardEvent} event
 * @param {boolean} physicalKeys
 * @param {boolean} ignoreModifierKeys
 * @returns {string}
 */
export function keyboardEventString (
  event,
  physicalKeys = _physicalKeys,
  ignoreModifierKeys = _ignoreModifierKeys
) {
  return physicalKeys
    ? `${modifierString(event)}_${event.code}`
    : ignoreModifierKeys
      ? `${event.key}`
      : `${modifierString(event)}_${event.key}`
}

/** Given a keyboard event, returns a string representation of its modifiers
 * @param {KeyboardEvent} event
 * @returns {string}
 */
function friendlyModifierString (event) {
  const { shiftKey: s, ctrlKey: c, altKey: a, metaKey: m } = event
  return `${s ? 'shift-' : ''}${c ? 'ctrl-' : ''}${a ? 'alt-' : ''}${
    m ? 'meta-' : ''
  }`
}

/** Given a keyboard event, returns a string representation of its modifiers
 * @param {KeyboardEvent} event
 * @returns {string}
 */
function friendlyShiftlessModifierString (event) {
  const { ctrlKey: c, altKey: a, metaKey: m } = event
  return `${c ? 'ctrl-' : ''}${a ? 'alt-' : ''}${m ? 'meta-' : ''}`
}

/** Converts a KeyboardEvent to a user-friendly string representation.
 * @param {KeyboardEvent} event
 * @param {boolean} physicalKeys
 * @param {boolean} ignoreModifierKeys
 * @returns {string}
 */
export function friendlyKeyboardEventString (
  event,
  physicalKeys = _physicalKeys,
  ignoreModifierKeys = _ignoreModifierKeys
) {
  return physicalKeys
    ? `${friendlyModifierString(event)}${
        friendlyCodeStrings[event.code]
          ? friendlyCodeStrings[event.code].value
          : event.code
      }`
    : ignoreModifierKeys
      ? `${event.key}`
      : `${friendlyShiftlessModifierString(event)}${event.key}`
}

/**
 * Returns whether a (possibly user-defined) keyboard event is valid
 * @param {KeyboardEvent} event
 * @returns {boolean}
 */
export function validKeyboardEvent (event) {
  return (
    event &&
    event.key &&
    typeof event.key === 'string' &&
    event.code &&
    typeof event.code === 'string' &&
    (!event.hasOwnProperty('shiftKey') ||
      (event.shiftKey && typeof event.shiftKey === 'boolean')) &&
    (!event.hasOwnProperty('ctrlKey') ||
      (event.ctrlKey && typeof event.ctrlKey === 'boolean')) &&
    (!event.hasOwnProperty('altKey') ||
      (event.altKey && typeof event.altKey === 'boolean')) &&
    (!event.hasOwnProperty('metaKey') ||
      (event.metaKey && typeof event.metaKey === 'boolean'))
  )
}

/**
 * Extracts the important attributes from a KeyboardEvent so that
 * the event can be sent as JSON
 * @param {KeyboardEvent} event
 */
export function simplify ({
  key,
  code,
  ctrlKey,
  altKey,
  metaKey,
  shiftKey,
  repeat
}) {
  return {
    key,
    code,
    ctrlKey,
    altKey,
    metaKey,
    shiftKey,
    repeat
  }
}
