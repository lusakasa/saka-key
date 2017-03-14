/**
 * Conditionally loads a content script
 */

import { msg } from 'mosi/light-client';

if (SAKA_DEBUG) {
  console.log('loader initializing...');
}

if (window.innerWidth >= 3 && window.innerHeight >= 3) {
  msg(1, 'loadClient');
}
