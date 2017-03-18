// TODO: Make sure style selection happens at build time

const fontStyles = `
font-family: Roboto;
-moz-osx-font-smoothing: grayscale;
-webkit-font-smoothing: antialiased;
font-style: normal;
font-weight: normal;
src: url(${chrome.runtime.getURL('Roboto-Regular.tff')}) format('tff');
`;

// use all: initial to reset styles to default
const hintStyles = `
all: initial;
z-index: 999999999999;
font-family: Roboto, sans-serif;
font-weight: 100;
font-size: 12px;
padding: 0px 1px;
border-width: 1px;
border-style: solid;
border-color: #ff4081;
color: #ff4081;
background-color: #ffffff;
border-radius: 4px;
text-align: center;
text-decoration: none;
text-transform: uppercase;
vertical-align: middle;`;

// // Chrome support shadow DOM, so reset styles are not needed
// const optionalResetStyles = SAKA_PLATFORM === 'chrome'
//   ? ''
//   : ''; // resetStyles;
const browserSpecificHintStyles = SAKA_PLATFORM === 'chrome'
  ? ''
  : 'padding: 2px 1px 0px 1px;';

export const style = `
@font-face { ${fontStyles} }
.hint {
  ${hintStyles}
  ${browserSpecificHintStyles}
}
`;
