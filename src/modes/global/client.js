import { Mode } from 'modes/mode/client';
import { isTextEditable } from 'lib/dom';
import { toggleHelpMenu } from './help';

class Global extends Mode {
  actions = {
    setEnabled: (enabled) => {
      if (enabled) {
        if (isTextEditable(document.activeElement)) {
          return 'TEXT';
        }
        return 'COMMAND';
      }
      return 'DISABLED';
    },
    toggleHelpMenu
  }
}

export const GLOBAL = new Global('GLOBAL');
