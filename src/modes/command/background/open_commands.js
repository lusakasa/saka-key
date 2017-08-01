import { searchURL } from 'lib/url';

export function openCurrentTab (text) {
  chrome.tabs.update({
    url: searchURL(text)
  });
}

export function openBackgroundTab (text) {
  chrome.tabs.create({
    url: searchURL(text),
    active: false
  });
}

export function openForegroundTab (text) {
  chrome.tabs.create({
    url: searchURL(text)
  });
}

export function openNewWindow (text) {
  chrome.windows.create({
    url: searchURL(text)
  });
}

export function openIncognitoWindow (text) {
  chrome.windows.create({
    url: searchURL(text),
    incognito: true
  });
}
