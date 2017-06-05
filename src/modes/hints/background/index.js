import { modeMsg, modeGet, meta } from 'background_page/msg';
import { generateHintStrings } from './hintStrings';
import { isModifierKey } from 'lib/keys';

let hintChars = 'adsfghjkl;';

export const mode = {
  name: 'Hints',
  onInstalled: () => {},
  clientSettings: (options, settings) => {
    const errors = {};
    // styling
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
      // hintOpacity
      const opacity = parseFloat(settings.hintOpacity);
      if (isNaN(opacity) || opacity < 0 || opacity > 1) {
        errors.hintOpacity = 'Opacity must be a number between 0.0 and 1.0';
      }
      // hintFontSize
      const fontSize = parseFloat(settings.hintFontSize);
      if (isNaN(fontSize) || fontSize < 1) {
        errors.hintFontSize = 'Font Size must be a number between greater than or equal to 1';
      }
      // hintPaddingLeft
      const paddingLeft = parseFloat(settings.hintPaddingLeft);
      if (isNaN(paddingLeft) || paddingLeft < 0) {
        errors.hintPaddingLeft = 'Padding Left must be a non-negative number';
      }
      // hintPaddingLeft
      const paddingRight = parseFloat(settings.hintPaddingRight);
      if (isNaN(paddingRight) || paddingRight < 0) {
        errors.hintPaddingRight = 'Padding Right must be a non-negative number';
      }
      // hintPaddingTop
      const paddingTop = parseFloat(settings.hintPaddingTop);
      if (isNaN(paddingTop) || paddingTop < 0) {
        errors.hintPaddingTop = 'Padding Top must be a non-negative number';
      }
      // hintPaddingBottom
      const paddingBottom = parseFloat(settings.hintPaddingBottom);
      if (isNaN(paddingBottom) || paddingBottom < 0) {
        errors.hintPaddingBottom = 'Padding Bottom must be a non-negative number';
      }
      // hintBorderWidth
      const borderWidth = parseFloat(settings.hintBorderWidth);
      if (isNaN(borderWidth) || borderWidth < 0) {
        errors.hintBorderWidth = 'Border Width must be a non-negative number';
      }
      // hintBorderRadius
      const borderRadius = parseFloat(settings.hintBorderRadius);
      if (isNaN(borderRadius) || borderRadius < 0) {
        errors.hintBorderRadius = 'Border Radius must be a non-negative number';
      }
      hintCSS = generateHintCSSFromGUISettings(settings);
      hintNormalCharCSS = '';
      hintActiveCharCSS = 'opacity: 0.5';

      // hintChars only needed by background page
      hintChars = settings.hintChars;
    }
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
    gatherHints: async (_, src) => {
      // 1. Gather the number of link hints in each frame
      const hintsPerFrame = await modeGet(`tab[${meta(src).tabId}]`, 'Hints', 'findHints');
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
        const currentTabTarget = `tab[${meta(src).tabId}]`;
        const results = await modeGet(currentTabTarget, 'Hints', 'advanceHints', event.key);
        if (results.every(({ v }) => v === 'Filtered')) {
          modeMsg(currentTabTarget, 'Hints', 'exitHintsMode');
        }
      }
    }
  }
};

function generateHintCSSFromGUISettings (settings) {
  return `
all: initial;
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
border-radius: ${settings.hintBorderRadius}px;`;
}
