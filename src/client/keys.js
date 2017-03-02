
// TODO: work on case sensitivity
const textInputTypes = [ 'text', 'search', 'email', 'url', 'number', 'password', 'date', 'tel' ];
export function textElementFocused () {
  const e = document.activeElement;
  if (e) {
    if (e.nodeName === 'INPUT') {
      if (!e.disabled && !e.readonly && (!e.type || textInputTypes.includes(e.type))) {
        return true;
      }
    } else if (e.nodeName === 'TEXTAREA') {
      return true;
    } else if (e.contentEditable === 'true') {
      return true;
    }
    return false;
  }
  return false;
};

