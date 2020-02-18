/** Returns the _positive_ modulus */
export function posMod (n, m) {
  return ((n % m) + m) % m
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
    if (hasProp(object, key)) {
      output[key] = object[key]
    } else {
      throw Error(`object has no attribute ${key}`)
    }
  })
  return output
}

/**
 * Check if an object has a given property
 * @param {Object} object Object to check
 * @param {String} prop String property to check
 */
export function hasProp (object, prop) {
  return Object.prototype.hasOwnProperty.call(object, prop)
}

export function objectMap (object, map) {
  const out = {}
  Object.entries(object).forEach(([attribute, value]) => {
    out[attribute] = map(value)
  })
  return out
}
