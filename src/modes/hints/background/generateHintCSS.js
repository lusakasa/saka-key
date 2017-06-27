/**
 * Given input settings parameters, generates the CSS used to style link hints
 */
export function generateHintCSS ({
  hintOpacity,
  hintFontFamily,
  hintFontWeight,
  hintPaddingTop,
  hintPaddingRight,
  hintPaddingBottom,
  hintPaddingLeft,
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
padding: ${hintPaddingTop}rem ${hintPaddingRight}rem ${hintPaddingBottom}rem ${hintPaddingLeft}rem;
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
