import { modeMsg, modeGet, meta } from 'background_page/msg';
import { generateHintStrings } from './hintStrings';
import { isModifierKey } from 'lib/keys';

let hintChars = 'adsfghjkl;';

export default {
  clientSettings: (options, settings) => {
    const errors = {};
    let {
      hintCSS,
      hintNormalCharCSS,
      hintActiveCharCSS,
      hintDetectByCursorStyle,
      hintHorizontalPlacement,
      hintVerticalPlacement
    } = settings;
    if (settings.hintUseCustomCSS) {
      hintCSS = `all: initial; z-index: 999999999999; ${hintCSS}`;
    } else {
      hintCSS = generateHintCSSFromGUISettings(settings);
      hintNormalCharCSS = '';
      hintActiveCharCSS = 'opacity: 0.5';
    }
    hintChars = settings.hintChars;
    return {
      values: {
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

function generateHintCSSFromGUISettings (settings) {
  return (
`all: initial;
z-index: 999999999999;
opacity: ${settings.hintOpacity};
font-family: ${settings.hintFontFamily};
font-weight: ${settings.hintFontWeight};
padding: ${settings.hintPaddingTop}px ${settings.hintPaddingRight}px ${settings.hintPaddingBottom}px ${settings.hintPaddingLeft}px;
border: ${settings.hintBorderWidth}px solid;
text-align: center;
text-decoration: none;
text-transform: uppercase;
vertical-align: middle;
font-size: ${settings.hintFontSize}px;
color: ${settings.hintTextColor};
background-color: ${settings.hintBackgroundColor};
border-color: ${settings.hintBorderColor};
${settings.hintShadow ? 'box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);' : ''}
border-radius: ${settings.hintBorderRadius}px;`);
}
