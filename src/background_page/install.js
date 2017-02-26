
function loadDefaultKeyBindings () {
  fetch(chrome.runtime.getURL('/config.json'))
    .then((response) => response.json())
    .then((config) => {
      const bindings = config.defaultBindings;
      if (validBindings(bindings)) {
        
      } else {
        console.error('Invalid default key bindings');
      }
    });
}

chrome.runtime.onInstalled(({ reason }) => {
  switch (reason) {
    case 'install':
      loadDefaultKeyBindings();
      break;
    case 'update':
    case 'chrome_update':
    case 'shared_module_update':
    default:
      break;
  }
});
