import './style.css';
import { isTextEditable } from 'lib/dom';

const iframe = document.createElement('iframe');
iframe.id = 'popup';
iframe.src = chrome.runtime.getURL('options.html');
iframe.setAttribute('class', 'helpFrame');

let visible = false;

export const toggleHelpMenu = () => {
  if (visible) {
    document.documentElement.removeChild(iframe);
  } else {
    // append to document element (<html> node) because document body might not have loaded yet
    document.documentElement.appendChild(iframe);
    iframe.focus();
  }
  visible = !visible;
  if (isTextEditable(document.activeElement)) {
    return 'TEXT';
  }
  return 'COMMAND';
};
