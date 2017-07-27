/**
 * Returns true only if str is a valid url
 * @param {string} str
 */
export function isURL (str) {
  try {
    new URL(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function stripProtocol (url) {
  return url.replace(/(^\w+:|^)\/\//, '');
}

export function stripWWW (url) {
  return url.replace(/^www\./, '');
}

export function startsWithProtocol (str) {
  return str.match(/(^\w+:|^)\/\//) !== null;
}

export function startsWithWWW (str) {
  return str.match(/^www\./, '') !== null;
}
