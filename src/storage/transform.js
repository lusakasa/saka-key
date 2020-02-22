import transformGeneral from 'options/General'
import transformKeybindings from 'options/Keybindings'
import transformAppearance from 'options/Appearance'
import transformBlacklist from 'options/Blacklist'
const transforms = {
  General: transformGeneral,
  Keybindings: transformKeybindings,
  Appearance: transformAppearance,
  Blacklist: transformBlacklist
}
export const categories = Object.keys(transforms)

/**
 * Given a key-value map of options, applies and merges each per-category transform.
 * @param {{ [key: string]: any }} allOptions
 * @returns {{ backgroundOptions: { [key: string]: any }, clientOptions: { [key: string]: any }, errors: { [key: string]: any } }}
 */
export default function transformOptions (allOptions, config) {
  const allBackgroundOptions = {}
  const allClientOptions = {}
  const allErrors = {}
  Object.entries(transforms).forEach(([category, transform]) => {
    const { clientOptions, backgroundOptions, errors } = transform(
      allOptions,
      config[category]
    )
    Object.assign(allClientOptions, clientOptions)
    Object.assign(allBackgroundOptions, backgroundOptions)
    Object.assign(allErrors, errors)
  })
  return {
    backgroundOptions: allBackgroundOptions,
    clientOptions: allClientOptions,
    errors: allErrors
  }
}
