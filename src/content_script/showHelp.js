import './help.css';

const counter = document.createElement('div');
counter.setAttribute('style', 'z-index: 99999; position: fixed; top: 0; right: 0;');
counter.innerHTML = '<input id="random" disabled placeholder="I EXIST!"/>';

const iframe = document.createElement('iframe');
iframe.id = 'popup';
iframe.src = chrome.runtime.getURL('options.html');
iframe.setAttribute('class', 'helpFrame');
iframe.setAttribute('width', '400');
iframe.setAttribute('height', '600');

let visible = false;

export const showHelp = () => {
  if (visible) {
    document.documentElement.removeChild(iframe);
  } else {
    // append to document element (<html> node) because document body might not have loaded yet
    document.documentElement.appendChild(iframe);
  }
  visible = !visible;
};
