export default (config, settings) => {
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
  return {
    errors: {},
    backgroundSettings: {
      hintChars: settings.hintChars
    },
    clientSettings: {
      hintCSS,
      hintNormalCharCSS,
      hintActiveCharCSS,
      hintDetectByCursorStyle,
      hintHorizontalPlacement,
      hintVerticalPlacement
    }
  };
};

function generateHintCSSFromGUISettings (settings) {
  return (
`all: initial;
z-index: 2147483647;
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
