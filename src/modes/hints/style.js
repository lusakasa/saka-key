// TODO: Make sure style selection happens at build time

const fontStyles = `
font-family: Roboto;
-moz-osx-font-smoothing: grayscale;
-webkit-font-smoothing: antialiased;
font-style: normal;
font-weight: normal;
src: url(${chrome.runtime.getURL('Roboto-Regular.tff')}) format('tff');
`;

const hintStyles = `
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
/* margin: 0px 1px; */
text-align: center;
text-decoration: none;
text-transform: uppercase;
vertical-align: middle;`;

const resetStyles = `
background: none;
border: none;
bottom: auto;
box-shadow: none;
cursor: auto;
display: inline;
float: none;
font-family : "Helvetica Neue", "Helvetica", "Arial", sans-serif;
font-size: inherit;
font-style: normal;
font-variant: normal;
font-weight: normal;
height: auto;
left: auto;
letter-spacing: 0;
line-height: 100%;
margin: 0;
max-height: none;
max-width: none;
min-height: 0;
min-width: 0;
opacity: 1;
padding: 0;
position: static;
right: auto;
text-align: left;
text-decoration: none;
text-indent: 0;
text-shadow: none;
text-transform: none;
top: auto;
vertical-align: baseline;
white-space: normal;
width: auto;`;

// Chrome support shadow DOM, so reset styles are not needed
const optionalResetStyles = SAKA_PLATFORM === 'chrome'
  ? ''
  : resetStyles;
const browserSpecificHintStyles = SAKA_PLATFORM === 'chrome'
  ? ''
  : 'padding: 2px 1px 0px 1px;';

export const style = `
@font-face { ${fontStyles} }
.hint {
  ${optionalResetStyles}
  ${hintStyles}
  ${browserSpecificHintStyles}
}
`;
