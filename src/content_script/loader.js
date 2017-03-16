/**
 * This script is loaded into every frame of every page.
 * The full Saka Key client (at ./index.js) is loaded only into frames
 * that the user can actually interact with to improve performance
 */

import { msg } from 'mosi/light-client';

if (window.innerWidth >= 3 && window.innerHeight >= 3) {
  msg(1, 'modeAction', {
    mode: 'BASIC',
    action: 'loadClient'
  });
}
