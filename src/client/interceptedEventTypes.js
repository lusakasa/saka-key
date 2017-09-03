import { fullscreenchange } from 'lib/dom';

/**
 * Events Saka Key intercepts and whether they must be trusted or not.
 * Keyboard events must be trusted so that websites cannot issue arbitrary commands
 */
export default {
  keydown: true,
  keypress: true,
  keyup: true,
  blur: false,
  focus: false,
  click: false,
  mousedown: false,
  [fullscreenchange]: false
};

