
/**
 * Converts a key binding to its string representation.
 * A binding is an array of KeyboardEvent descriptors.
 * A KeyboardEvent descriptor is of the form:
 *   1. If the KeyboardEvent is special (ctrl, alt or meta is pressed):
 *      { code, shiftKey, ctrlKey, altKey, metaKey }
 *   2. Otherwise:
 *      { key }
 * Prepends '•' to the code representation to distinguish between the two
 * representation and avoid prefix collisions (e.g. 'K' is a prefix of 'KeyJ')
 */
export function keyboardEventString (event) {
  return (event.ctrlKey || event.altKey || event.metaKey)
    ? ('•' + event.code + '+' +
      (event.shiftKey ? 'S' : '') +
      (event.ctrlKey ? 'C' : '') +
      (event.altKey ? 'A' : '') +
      (event.metaKey ? 'M' : ''))
    : event.key;
};
