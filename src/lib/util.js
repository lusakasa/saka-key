/** Returns the _positive_ modulus */
export function posMod(n, m) {
  return (n % m + m) % m
}

export function getAttributes(object, keys) {
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

export function objectMap(object, map) {
  const out = {}
  Object.entries(object).forEach(([attribute, value]) => {
    out[attribute] = map(value)
  })
  return out
}
