import { modeMsg, modeGet, meta } from 'background_page/msg';
import { generateHintStrings } from './hintStrings';
import { isModifierKey } from 'lib/keys';
import { generateHintCSS } from './generateHintCSS';

let hintChars = 'adsfghjkl;';

export default {
  clientSettings: (options, settings) => {
    const errors = {};
    let {
      hintFontSize,
      hintUseTargetSize,
      hintCSS,
      hintNormalCharCSS,
      hintActiveCharCSS,
      hintDetectByCursorStyle,
      hintHorizontalPlacement,
      hintVerticalPlacement
    } = settings;
    if (settings.hintUseCustomCSS) {
      hintCSS = `all: initial; position: absolute; z-index: 2147483647; ${hintCSS}`;
    } else {
      hintCSS = generateHintCSS(settings);
      hintNormalCharCSS = '';
      hintActiveCharCSS = 'opacity: 0.5';
    }
    hintChars = settings.hintChars;
    return {
      values: {
        hintFontSize,
        hintUseTargetSize,
        hintCSS,
        hintNormalCharCSS,
        hintActiveCharCSS,
        hintDetectByCursorStyle,
        hintHorizontalPlacement,
        hintVerticalPlacement
      },
      errors
    };
  },
  messages: {
    gatherHints: async (hintType, src) => {
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
