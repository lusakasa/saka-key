import { msg, get, meta } from 'mosi/core';

/** Stores whether Saka Key is enabled */
let enabled = true;
let activeProfile = 'standard';

const MODE = 'Basic';

export const mode = {
  name: MODE,
  onInstalled: () => {},
  onSettingsChange: (profile, newSettings) => {
    const { enabled: isEnabled, primaryColor, secondaryColor } = newSettings;
    if (profile === activeProfile) {
      enabled = isEnabled;
    }
  },
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
    initClient: async (arg, src) => {
      const bindings = (await get(0, 'modeAction', {
        mode: 'Command',
        action: 'bindings'
      }))[0].v;
      msg(src, 'modeAction', {
        mode: MODE,
        action: 'initClient',
        arg: { enabled, bindings }
      });
    },
    getEnabled (_, src) {
      msg(src, 'setEnabled', enabled);
    },
    toggleEnabled: () => {
      enabled = !enabled;
      msg('popup', 'setEnabled', enabled);
      msg('cs', 'modeAction', {
        mode: 'Basic',
        action: 'setEnabled',
        arg: enabled
      });
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
