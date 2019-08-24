/** Returns the _positive_ modulus */
export function posMod (n, m) {
  return (n % m + m) % m
}
/**
 * Return copy of object that contains only the attributes specified in key array
 *
 * @param {Object} object Object that attributes are copied from
 * @param {String[]} keys String array of attributes to copy
 * @throws {Error} Object does not contain attribute key
 * @returns {Object} Object that contains only the attributes specified in key array
 */
export function getAttributes (object, keys) {
  const output = {}
  keys.forEach(key => {
    if (object.hasOwnProperty(key)) {
      output[key] = object[key]
    } else {
      throw Error(`object has no attribute ${key}`)
    }
  })
  return output
}

export function objectMap (object, map) {
  const out = {}
  Object.entries(object).forEach(([attribute, value]) => {
    out[attribute] = map(value)
  })
  return out
}
