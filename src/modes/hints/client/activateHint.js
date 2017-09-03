import { mouseEvent } from 'lib/dom';
import { isMac } from 'lib/keys';
import { msg } from 'mosi/client';

function backgroundOpenLink (hintType, hint) {
  if (hint.element.href) {
    msg(1, hintType, hint.element.href);
  }
}

export function activateHint (hint, hintType) {
  const click = (modifiers) => mouseEvent(hint.element, 'click', modifiers);
  switch (hintType) {
    case 'backgroundTab':
      click({ ctrlKey: !isMac, metaKey: isMac });
      if (SAKA_PLATFORM === 'firefox') {
        backgroundOpenLink('openLinkInBackgroundTab', hint);
      }
      break;
    case 'foregroundTab':
      click({ ctrlKey: !isMac, metaKey: isMac, shiftKey: true });
      if (SAKA_PLATFORM === 'firefox') {
        backgroundOpenLink('openLinkInForegroundTab', hint);
      }
      break;
    case 'newWindow':
      click({ shiftKey: true });
      if (SAKA_PLATFORM === 'firefox') {
        backgroundOpenLink('openLinkInNewWindow', hint);
      }
      break;
    case 'incognitoWindow':
      click({ shiftKey: true, ctrlKey: !isMac, metaKey: isMac });
      backgroundOpenLink('openLinkInIncognitoWindow', hint);
      break;
    case 'download':
      click({ altKey: true }); break;
      // TODO: handle on firefox
    case 'focusLink':
      // TODO: make sure this asserts hasInteractedWithPage in middleware
      if (SAKA_DEBUG) {
        console.log(`Hint [${hint.hintString}] targets:`, hint.element);
      }
      break;
    case 'currentTab':
    default:
      click();
  }
  console.log('bark');
  hint.element.focus();
  return 'Reset';
}
