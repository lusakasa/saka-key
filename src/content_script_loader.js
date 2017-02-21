/**
 * Conditionally loads a content script
 */

import { msg } from 'mosi/light-client';

if (window.innerWidth >= 3 || window.innerHeight >= 3) {
  msg(1, 'loadSaka');
} else {

}
