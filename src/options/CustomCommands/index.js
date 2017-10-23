import { getAttributes } from 'lib/util'

export default (options, config) => {
  console.error('CustomCommand/index.js called', options, config)
  const backgroundOptions = {}
  const clientOptions = {}
  const errors = {}
  return { backgroundOptions, clientOptions, errors }
}
