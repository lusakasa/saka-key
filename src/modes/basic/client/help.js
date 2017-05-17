import { isTextEditable } from 'lib/dom';
import { helpFrameStyle } from './style';

const iframe = document.createElement('iframe');
iframe.id = 'popup';
iframe.src = chrome.runtime.getURL('help.html');
iframe.style = helpFrameStyle;

let visible = false;



export const toggleHelpMenu = () => {
  if (visible) {
    document.documentElement.removeChild(iframe);
  } else {
    // append to document element (<html> node) because document body might not have loaded yet
    document.documentElement.appendChild(iframe);
    setTimeout(() => {
      iframe.contentWindow.focus();
    }, 100);
  }
  visible = !visible;
  if (isTextEditable(document.activeElement)) {
    return 'Text';
  }
  return 'Command';
};
