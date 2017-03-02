/**
 * This file isn't actually a mode. It's just a resource to help construct new modes.
 * Copy and paste its contents into the file of the new mode you want to create.
 * Note that the mode must
 * 1. Define its name in the constructor
 * 2. Provide a handler function for every possible event type
 * 3. Return a valid next mode from every handler
 * Do not attempt to remove 'unused' handlers. Instead, return the mode itself.
 * You might wonder why all the handlers are async functions. This is to support
 * offloading events to external extensions, which works as follows:
 * 1. The event is serialized and sent to the external extension
 * 2. The external extension does its own processing and calculates the new mode
 * 3. The external sends back the new mode to Saka Key
 * 4. Saka key's local handler returns the remotely calculate new mode from its handler
 */

import { Mode } from './mode';

class Template extends Mode {
  async keydown (event) {

  }
  async keypress (event) {

  }
  async keyup (event) {

  }
  async focus (event) {

  }
  async blur (event) {

  }
  async click (event) {

  }
  async mousedown (event) {

  }
  async scroll (event) {

  }
  async saka (event) {

  }
}

export const TEMPLATE = new Template('TEMPLATE');
