/**
 * This file concerns itself with handling user inputed RegExp
 */

/**
 * Determine if string matches any pattern in patterns array
 *
 * @export
 * @param {Regex[]} patterns Array of regex patterns
 * @param {String} str String to check patterns against
 * @returns {Boolean} True if string matches at least one pattern in list
 */
export function anyMatch (patterns, str) {
  if (patterns.find(pattern => str.match(pattern))) return true
  else return false
}
