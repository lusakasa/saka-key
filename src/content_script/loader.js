/**
 * This script is loaded into every frame of every page.
 * The full Saka Key client (at ./index.js) is loaded only into frames
 * that the user can actually interact with to improve performance
 */

import { msg } from 'mosi/light-client';
import { installEventListeners } from 'client/installEventListeners';

if (window.innerWidth > 5 && window.innerHeight > 5) {
  installEventListeners();
  msg(1, 'loadClient');
}

