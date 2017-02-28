
/**
 * Converts a key binding to its string representation.
 * A binding is an array of KeyboardEvent descriptors.
 * A KeyboardEvent descriptor is of the form:
 *   1. If the KeyboardEvent is special (ctrl, alt or meta is pressed):
 *      { code, shiftKey, ctrlKey, altKey, metaKey }
 *   2. Otherwise:
 *      { key }
 */
export function keyboardEventString (event) {
  return (event.ctrlKey || event.altKey || event.metaKey)
    ? (event.code + '+' +
      (event.shiftKey ? 'S' : '') +
      (event.ctrlKey ? 'C' : '') +
      (event.altKey ? 'A' : '') +
      (event.metaKey ? 'M' : ''))
    : event.key;
};

/**
 * Validates a user-defined keyboard event descriptor. Do not mistakenly call
 * this function on a 'natural' keyboard event. The supplied event should
 * be parsed from a configuration file.
 */
export function validateKeyboardEvent (event) {
  if (event.hasOwnProperty('code') === event.hasOwnProperty('key')) {
    throw Error('Either the key or the code property must be specified, but not both');
  }
  if (event.hasOwnProperty('code')) {
    for (const [key, value] of Object.entries(event)) {
      if (key === 'shiftKey' || key === 'ctrlKey' || key === 'altKey' || key === 'metaKey') {
        if (typeof value !== 'boolean') {
          throw Error(`Property ${key} must be a boolean (true or false)`);
        }
      } else if (key === 'code') {
        if (typeof value !== 'string') {
          throw Error('Property code must be a string');
        }
      } else {
        throw Error(`Invalid property ${key}`);
      }
    }
  } else {
    for (const [key, value] of Object.entries(event)) {
      if (key === 'shiftKey' || key === 'ctrlKey' || key === 'altKey' || key === 'metaKey') {
        throw Error(`No modifier properties, (e.g. ${key}) allowed if 'key' is specified`);
      } else if (key === 'key') {
        if (typeof value !== 'string') {
          throw Error('Property code must be a string');
        }
      } else {
        throw Error(`Invalid property ${key}`);
      }
    }
  }
}