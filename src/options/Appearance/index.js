import { getAttributes } from 'lib/util';

export default (options, config) => {
  const backgroundOptions = {};
  const clientOptions = getAttributes(options, ['hintCSS', 'hintNormalCharCSS', 'hintActiveCharCSS', 'hintDetectByCursorStyle', 'hintHorizontalPlacement', 'hintVerticalPlacement']);
  const errors = {};
  if (options.hintUseCustomCSS) {
    clientOptions.hintCSS = `all: initial; position: absolute; z-index: 999999999999; ${options.hintCSS}`;
  } else {
    clientOptions.hintCSS = generateHintCSS(options);
    clientOptions.hintNormalCharCSS = '';
    clientOptions.hintActiveCharCSS = 'opacity: 0.5';
  }
  return { backgroundOptions, clientOptions, errors };
};

/**
 * Given input settings parameters, generates the CSS used to style link hints
 */
function generateHintCSS ({
  hintOpacity,
  hintFontFamily,
  hintFontWeight,
  hintHorizontalPadding,
  hintVerticalPadding,
  hintBorderWidth,
  hintFontSize,
  hintTextColor,
  hintBackgroundColor,
  hintBorderColor,
  hintShadow,
  hintBorderRadius,
  hintHorizontalPlacement,
  hintVerticalPlacement,
  hintHorizontalTranslation,
  hintVerticalTranslation
}) {
  const translationX = hintHorizontalTranslation +
    (hintHorizontalPlacement === 'left'
      ? 0
      : hintHorizontalPlacement === 'right'
        ? -100
        : -50);
  const translationY = hintVerticalTranslation +
    (hintVerticalPlacement === 'top'
      ? 0
      : hintVerticalPlacement === 'bottom'
        ? -100
        : -50);
  return (
`all: initial;
position: absolute;
z-index: 2147483647;
opacity: ${hintOpacity};
font-family: ${hintFontFamily};
font-weight: ${hintFontWeight};
padding: ${hintVerticalPadding}rem ${hintHorizontalPadding}rem;
border: ${hintBorderWidth}px solid;
text-align: center;
text-decoration: none;
text-transform: uppercase;
vertical-align: middle;
font-size: ${hintFontSize}px;
color: ${hintTextColor};
background-color: ${hintBackgroundColor};
border-color: ${hintBorderColor};
${hintShadow ? 'box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);' : ''}
border-radius: ${hintBorderRadius}px;
transform: translate3d(${translationX}%, ${translationY}%, 0)`);
}
