import './help.css';

const iframe = document.createElement('iframe');
iframe.id = 'popup';
iframe.src = chrome.runtime.getURL('options.html');
iframe.setAttribute('class', 'helpFrame');
iframe.setAttribute('width', '400');
iframe.setAttribute('height', '600');

let visible = false;

export const showHelpMenu = () => {
  if (visible) {
    document.documentElement.removeChild(iframe);
  } else {
    // append to document element (<html> node) because document body might not have loaded yet
    document.documentElement.appendChild(iframe);
  }
  visible = !visible;
};
