import { msg } from 'mosi/light-client';
import { installEventListeners } from 'client/eventListeners';

if (window.innerWidth > 5 && window.innerHeight > 5) {
  installEventListeners();
  msg(1, 'loadClient');
}

