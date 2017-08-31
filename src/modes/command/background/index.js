import { paste } from 'lib/dom';
import * as tabCommands from './tab_commands';
import {
  openCurrentTab,
  openBackgroundTab,
  openForegroundTab,
  openNewWindow,
  openIncognitoWindow
} from './open_commands';

export default {
  messages: {
    // toggleHelpMenu: () => { msg(0, 'toggleHelpMenu'); },
    ...tabCommands,
    clipboardCurrentTab: () => openCurrentTab(paste()),
    clipboardBackgroundTab: () => openBackgroundTab(paste()),
    clipboardForegroundTab: () => openForegroundTab(paste()),
    clipboardNewWindow: () => openNewWindow(paste()),
    clipboardIncognitoWindow: () => openIncognitoWindow(paste())
  }
};
