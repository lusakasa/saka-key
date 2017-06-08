// TODO: at some point remove this polyfill or if an npm package is released
// use it, instead of a random github repo
if (SAKA_PLATFORM === 'chrome') {
  require('webextension-polyfill/dist/browser-polyfill');
}
