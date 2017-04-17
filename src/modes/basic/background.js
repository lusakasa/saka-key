import { msg, meta } from 'mosi/core';

const MODE = 'Basic';

export const mode = {
  name: MODE,
  onInstalled: () => {},
  clientSettings: (options, { enabled }) => ({ enabled }),
  messages: {
    loadClient (_, src) {
      const { frameId, tabId } = meta(src);
      if (SAKA_DEBUG) {
        console.log(`Loading client: frame: ${frameId}, tab" ${tabId}`);
      }
      chrome.tabs.executeScript(tabId, {
        file: '/content_script.js',
        frameId,
        runAt: 'document_start',
        matchAboutBlank: true
      });
    },
    toggleEnabled: () => {
      // TODO: change appropriate enabled key in local storage
    },
    toggleHelpMenu: () => {
      chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
        msg(`tab[${tab.id}]&topFrame`, 'modeAction', {
          mode: 'Basic',
          action: 'toggleHelpMenu'
        });
      });
    }
  }
};
