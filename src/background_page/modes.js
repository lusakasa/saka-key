// import basicConfig from 'modes/basic/config.json';
// import commandConfig from 'modes/command/config.json';
// import hintsConfig from 'modes/hints/config.json';
// import developerConfig from 'modes/developer/config.json';

/** The available modes */
let modes = {};

export async function modeAction ({ mode, action, arg }, src) {
  if (SAKA_DEBUG) {
    if (!modes[mode]) {
      throw Error(`Missing Mode ${mode}`);
    }
    if (!modes[mode].messages[action]) {
      throw Error(`Mode ${mode} is missing a handler for action ${action}`);
    }
  }
  return await modes[mode].messages[action](arg, src);
};

export function initModes (availableModes) {
  modes = availableModes;
  addListeners(modes);
}

// async function setupDefaultConfig (modes) {
//   const configFilePaths = Object.keys(modes).map((name) =>
//     `/config/${name.toLowerCase()}.json`
//   );
//   const configFetch = await Promise.all(configFilePaths.map((path) => fetch(path)));
//   const config = await Promise.all(configFetch.map((fetch) => fetch.json()));
//   chrome.storage.local.set({'modesConfig': config}, () => {
//     if (chrome.runtime.lastError) {
//       console.error(chrome.runtime.lastError);
//       return;
//     }
//     if (SAKA_DEBUG) {
//       console.log('Modes modesConfig installed:', config);
//     }
//   });
// }

async function setupDefaultConfig (modes) {
  const configFilePaths = Object.keys(modes).map((name) =>
    `/config/${name.toLowerCase()}.json`
  );
  try {
    const configFetch = await Promise.all(configFilePaths.map((path) => fetch(path)));
    const config = await Promise.all(configFetch.map((fetch) => fetch.json()));
    await browser.storage.local.set({'modesConfig': config});
  } catch (error) {
    console.error(error);
  }
}

async function loadDefaultSettings (modes) {
  const configFilePaths = Object.keys(modes).map((name) =>
    `/defaults/${name.toLowerCase()}.json`
  );
  const configFetch = await Promise.all(configFilePaths.map((path) => fetch(path)));
  const config = await Promise.all(configFetch.map((fetch) => fetch.json()));
  chrome.storage.local.set({'modesConfig': config}, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }
    if (SAKA_DEBUG) {
      console.log('Modes modesConfig installed:', config);
    }
  });
}

function addListeners (modes) {
  chrome.runtime.onInstalled.addListener((details) => {
    Object.values(modes).forEach((mode) => {
      mode.onInstalled(details);
    });
    setupDefaultConfig(modes);
  });
  chrome.runtime.onStartup.addListener(() => {
    Object.values(modes).forEach((mode) => {
      mode.onStartup();
    });
  });
  // TODO: Remove this when firefox fixes bug in next version
  if (SAKA_DEBUG && SAKA_PLATFORM === 'firefox') {
    Object.values(modes).forEach((mode) => {
      mode.onStartup();
    });
  }
}
