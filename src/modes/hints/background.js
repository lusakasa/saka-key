const MODE = 'Hints';

export const mode = {
  name: MODE,
  onInstalled: () => {},
  onSettingChange: (profile, newSettings) => {},
  clientSettings: (options, settings) => {
    let { hintCSS, normalCharCSS, activeCharCSS } = settings;
    if (settings.useCustomCSS) {
      hintCSS = `
all: initial;
z-index: 999999999999;
` + hintCSS;
    } else {
      hintCSS = (
`all: initial;
z-index: 999999999999;
font-family: Roboto, sans-serif;
font-weight: 100;
padding: 0px 1px;
border-width: 1px;
border-style: solid;
text-align: center;
text-decoration: none;
text-transform: uppercase;
vertical-align: middle;
font-size: ${settings.fontSize}px;
color: ${settings.textColor};
background-color: ${settings.backgroundColor};
border-color: ${settings.borderColor};
${settings.shadow ? 'box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);' : ''}
border-radius: ${settings.borderRadius}px;`);
      normalCharCSS = '';
      activeCharCSS = 'opacity: 0.5';
    }
    return { hintCSS, normalCharCSS, activeCharCSS };
  },
  messages: {}
};
