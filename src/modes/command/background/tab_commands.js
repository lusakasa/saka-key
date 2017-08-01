
let zoomStep = 10; // for 10%

// Returns the _positive_ modulus
const mod = (n, m) => ((n % m) + m) % m;

/** Activate the tab to the right of the active tab of the current window */
export function nextTab () {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const activeTabIndex = tabs.findIndex((tab) => tab.active);
    const nextTabId = tabs[mod(activeTabIndex + 1, tabs.length)].id;
    chrome.tabs.update(nextTabId, { active: true });
  });
}

/** Activate the tab to the left of the active tab of the current window */
export function previousTab () {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const activeTabIndex = tabs.findIndex((tab) => tab.active);
    const previousTabId = tabs[mod(activeTabIndex - 1, tabs.length)].id;
    chrome.tabs.update(previousTabId, { active: true });
  });
}

/** Activate the first tab of the current window */
export function firstTab () {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const firstTabId = tabs[0].id;
    chrome.tabs.update(firstTabId, { active: true });
  });
}

/** Activate the last tab of the current window */
export function lastTab () {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const lastTabId = tabs[tabs.length - 1].id;
    chrome.tabs.update(lastTabId, { active: true });
  });
}

/** Move the active tab of the current window left */
export function moveTabLeft () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    chrome.tabs.move(tab.id, { index: tab.index - 1 });
  });
}

/** Move the active tab of the current window right */
export function moveTabRight () {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const activeTabIndex = tabs.findIndex((tab) => tab.active);
    const nextTabIndex = mod(activeTabIndex + 1, tabs.length);
    chrome.tabs.move(tabs[activeTabIndex].id, { index: nextTabIndex });
  });
}

/** Move the active tab of the current window to the far left */
export function moveTabFirst () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    chrome.tabs.move(tab.id, { index: 0 });
  });
}

/** Move the active tab of the current window to the far right */
export function moveTabLast () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    chrome.tabs.move(tab.id, { index: -1 });
  });
}

/** Close the active tab of the current window */
export function closeTab () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    chrome.tabs.remove(tab.id);
  });
}

/** Close all tabs of the current window except the active tab */
export function closeOtherTabs () {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    tabs.forEach((tab) => {
      if (!tab.active) chrome.tabs.remove(tab.id);
    });
  });
}

/** Close all tabs to the right of the active tab of the current window */
export function closeRightTabs () {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const activeTabIndex = tabs.findIndex((tab) => tab.active);
    tabs.slice(activeTabIndex + 1).forEach((tab) => {
      chrome.tabs.remove(tab.id);
    });
  });
}

/** Close all tabs to the left of the active tab of the current window */
export function closeLeftTabs () {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const activeTabIndex = tabs.findIndex((tab) => tab.active);
    tabs.slice(0, activeTabIndex).forEach((tab) => {
      chrome.tabs.remove(tab.id);
    });
  });
}

/** Create and activate a new tab */
export function newTab () {
  chrome.tabs.create({});
}

/** Reopen and activate the last closed tab */
export function restoreTab () {
  chrome.sessions.restore();
}

/** Duplicate and activate the active tab of the current window */
export function duplicateTab () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    chrome.tabs.duplicate(tab.id);
  });
}

/** Create a new window */
export function newWindow () {
  // TODO: Implement
  console.errot('newWindow not implemented');
}

/** Activate the next window */
export function switchWindow () {
  // TODO: Implement
  console.errot('switchWindow not implemented');
}

/** Zoom in the active tab of the current window */
export function zoomIn () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    chrome.tabs.getZoom((zoomFactor) => {
      chrome.tabs.setZoom(tab.id, Math.min(zoomFactor + zoomStep / 100, 3.0));
    });
  });
}

/** Zoom out the active tab of the current window */
export function zoomOut () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    chrome.tabs.getZoom((zoomFactor) => {
      chrome.tabs.setZoom(tab.id, Math.max(zoomFactor - zoomStep / 100, 0.3));
    });
  });
}

/** Reset the zoom of the active tab of the current window */
export function zoomReset () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    chrome.tabs.getZoom((zoomFactor) => {
      chrome.tabs.setZoom(tab.id, 0);
    });
  });
}

/** Refresh the active tab of the current window */
export function refreshTab () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    chrome.tabs.reload(tab.id);
  });
}

/** Refresh all tabs of the current window */
export function refreshAllTabs () {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });
  });
}

/** Toggle the mute state of the active tab of the current window */
export function toggleMuteTab () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    chrome.tabs.update(tab.id, { muted: !tab.mutedInfo.muted });
  });
}

let muted = false;

/** Mute all tabs of all windows */
export function toggleMuteAllTabs () {
  muted = !muted;
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.update(tab.id, { muted });
    });
  });
}

/** Toggle the pin state of the active tab of the current window */
export function togglePinTab () {
  chrome.tabs.query({ currentWindow: true, active: true }, ([tab]) => {
    chrome.tabs.update(tab.id, { pinned: !tab.pinned });
  });
}
