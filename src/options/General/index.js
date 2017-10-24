import { getAttributes } from 'lib/util'

export default (options, config) => {
  const backgroundOptions = getAttributes(options, ['autoActivateHint'])
  const clientOptions = getAttributes(options, [
    'enabled',
    'preventStealFocus',
    'hintDetectByCursorStyle',
    'smoothScroll',
    'scrollStep'
  ])
  const errors = {}
  return { backgroundOptions, clientOptions, errors }
}
