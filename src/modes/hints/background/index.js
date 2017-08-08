import { modeMsg, modeGet, meta } from 'background_page/msg';
import { generateHintStrings } from './hintStrings';
import { isModifierKey } from 'lib/keys';

let hintChars = 'adsfghjkl;';

export default {
  onOptionsChange: (options) => {
    hintChars = options.hintChars;
  },
  messages: {
    gatherHints: async (hintType, src) => {
      // TODO: handle case in which get() fails or times out by wrapping call in try-catch block
      // 1. Gather the number of link hints in each frame
      const hintsPerFrame = await modeGet(`tab[${meta(src).tabId}]|id[${src}]`, 'Hints',
        'findHints', hintType);
      // 2. Generate Hint Strings
      const totalHints = hintsPerFrame.reduce((total, { v }) => total + v, 0);
      const hintStrings = generateHintStrings(hintChars, totalHints);
      // 3. Send each frame the strings for its hints
      let offset = 0;
      hintsPerFrame.forEach(({ id, v }) => {
        const nextOffset = offset + v;
        modeMsg(id, 'Hints', 'renderHints', hintStrings.slice(offset, nextOffset));
        offset = nextOffset;
      });
    },
    processKey: async (event, src) => {
      if (!isModifierKey(event)) {
        const currentTabTarget = `tab[${meta(src).tabId}]|id[${src}]`;
        const results = await modeGet(currentTabTarget, 'Hints', 'advanceHints', event.key);
        if (results.every(({ v }) => v === 'Filtered')) {
          modeMsg(currentTabTarget, 'Hints', 'exitHintsMode');
        }
      }
    },
    openLinkInIncognitoWindow: (url) => {
      // TODO: consider more robust URL verification like Vimium's
      chrome.windows.create({ incognito: true, url });
    }
  }
};
