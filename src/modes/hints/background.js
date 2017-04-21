const MODE = 'Hints';

function generateHintCSSFromGUISettings (settings) {
  return `
all: initial;
z-index: 999999999999;
opacity: ${settings.hintOpacity};
font-family: ${settings.fontFamily};
font-weight: ${settings.hintFontWeight};
padding: ${settings.paddingTop}px ${settings.paddingRight}px ${settings.paddingBottom}px ${settings.paddingLeft}px;
border: ${settings.borderWidth}px solid;
text-align: center;
text-decoration: none;
text-transform: uppercase;
vertical-align: middle;
font-size: ${settings.fontSize}px;
color: ${settings.textColor};
background-color: ${settings.backgroundColor};
border-color: ${settings.borderColor};
${settings.shadow ? 'box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);' : ''}
border-radius: ${settings.borderRadius}px;`;
}

export const mode = {
  name: MODE,
  onInstalled: () => {},
  onSettingChange: (profile, newSettings) => {},
  clientSettings: (options, settings) => {
    console.log('user updates settings', settings);
    let {
      hintCSS,
      normalCharCSS,
      activeCharCSS,
      hintChars,
      detectByCursorStyle,
      hintHorizontalPlacement,
      hintVerticalPlacement
    } = settings;
    if (settings.useCustomCSS) {
      hintCSS = `all: initial; z-index: 999999999999; ${hintCSS}`;
    } else {
      hintCSS = generateHintCSSFromGUISettings(settings);
      normalCharCSS = '';
      activeCharCSS = 'opacity: 0.5';
    }
    return {
      values: {
        hintCSS,
        normalCharCSS,
        activeCharCSS,
        hintChars,
        detectByCursorStyle,
        hintHorizontalPlacement,
        hintVerticalPlacement
      },
      errors: {}
    };
  },
  messages: {}
};
