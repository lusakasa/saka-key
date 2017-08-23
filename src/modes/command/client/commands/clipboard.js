import { copy } from 'lib/dom';
import { background } from 'lib/msg';

export const copyURL = () => { copy(document.location.href); };
export const clipboardCurrentTab = background('clipboardCurrentTab');
export const clipboardBackgroundTab = background('clipboardBackgroundTab');
export const clipboardForegroundTab = background('clipboardForegroundTab');
export const clipboardNewWindow = background('clipboardNewWindow');
export const clipboardIncognitoWindow = background('clipboardIncognitoWindow');
