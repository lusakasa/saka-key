import { getAttributes } from 'lib/util'

export default (options, config) => {
  const backgroundOptions = getAttributes(options, ['blacklist'])
  const clientOptions = {}
  const errors = {}
  return { backgroundOptions, clientOptions, errors }
}
