import { DISABLED } from '../modes/disabled';
import { COMMAND } from '../modes/command';
import { TEXT } from '../modes/text';

let mode = 'COMMAND';

const modes = {
  DISABLED,
  COMMAND,
  TEXT
};

async function eventListener (event) {
  mode = await modes[mode].handleEvent(event);
}

/**
 * Installs keydown, keypress, and keyup event listeners.
 * Commands are triggered by the keypress handler and ignored  and suppressed
 * by the keydown and keyup handlers.
 * Note that the listeners intercept keyboard events in the capturing phase,
 * not bubbling phase.
 * http://web.archive.org/web/20170125014918/http://javascript.info/tutorial/bubbling-and-capturing
 */
export function addEventListeners () {
  const eventTypes = [
    'keydown',
    'keypress',
    'keyup',
    'focus',
    'blur',
    'click',
    'mousedown',
    'scroll',
    'saka'
  ];
  eventTypes.forEach((eventType) => {
    document.addEventListener(eventType, eventListener, true);
  });
  document.addEventListener('keypress', (e) => console.log('got', e), true);
}

/*
Saka Key handles input and modes using a state machine.
The states in this state machine corresponds to the modes the user can be in and the state of the document

handlers must be async to account for external extension handlers

mode state machine

'DISABLED'
  EnableChange(false) -> 'INIT'

'INIT'
  DomActivated -> 'DOCUMENT_FOCUSED'
  EnableChange(false) -> 'DISABLED'

'DOCUMENT_FOCUSED'
  Keypress('d') -> 'DOCUMENT_FOCUSED'
  Keypress('/') -> 'FIND'
  Keypress('^') -> 'EXTERNAL_EXTENSION_DEFINED_MODE'
  focus(inputElement) -> TEXT_INPUT_FOCUSED

'TEXT_INPUT_FOCUSED'
  Keypress('a') -> 'TEXT_INPUT_FOCUSED'
  blur() -> 'DOCUMENT_FOCUSED'

'FIND'
  Keypress('a') -> 'FIND'
  Keypress('Enter') -> 'FIND_SEARCH'


'FIND_SEARCH'
  Keypress('Escape') -> 'DOCUMENT_FOCUSED'
  Keypress('n') -> 'FIND_SEARCH'

Challenges
onEnter actions?
onExit actions?
how would external extensions define them?
handling async
*/
