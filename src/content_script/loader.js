/**
 * This script is loaded into every frame of every page.
 * 
 * The full Saka Key client (at ./index.js) is loaded only into frames
 * that the user can actually interact with to improve performance
 * 
 * DOM event listeners must be installed AS SOON AS POSSIBLE otherwise
 * webpages may install listeners that react to keyboard events before Saka Key
 */

import { msg } from 'mosi/light-client';
import { installEventListeners } from 'client/eventListeners';

if (window.innerWidth > 5 && window.innerHeight > 5) {
  installEventListeners();
  msg(1, 'loadClient');
}

