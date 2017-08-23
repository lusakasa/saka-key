export function getAttributes (object, keys) {
  const output = {};
  keys.forEach((key) => {
    if (object.hasOwnProperty(key)) {
      output[key] = object[key];
    } else {
      throw Error(`object has no attribute ${key}`);
    }
  });
  return output;
}

export function objectMap (object, map) {
  const out = {};
  Object.entries(object).forEach(([attribute, value]) => {
    out[attribute] = map(value);
  });
  return out;
}
