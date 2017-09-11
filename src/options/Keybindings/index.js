import { generateCommandTrie } from './trie'
import { getAttributes } from 'lib/util'
import { setKeyboardSettings } from 'lib/keys'

export default (options, config) => {
  const backgroundOptions = getAttributes(options, ['hintChars'])
  const clientOptions = getAttributes(options, [
    'physicalKeys',
    'ignoreModifierKeys'
  ])
  const errors = {}
  if (options.hintChars.length < 2) {
    errors.hintChars = 'A minimum of two hint characters must be specified'
  }
  setKeyboardSettings(options.physicalKeys, options.ignoreModifierKeys)
  const keybindings = keybindingsPerMode(options, config)
  Object.entries(keybindings).forEach(([mode, bindings]) => {
    try {
      clientOptions[
        mode ? `${mode}Bindings` : 'bindings'
      ] = generateCommandTrie(bindings)
    } catch (e) {
      if (e.type === 'conflict') {
        errors[e.command1] = e.message
        errors[e.command2] = e.message
      } else throw e
    }
  })
  return { backgroundOptions, clientOptions, errors }
}

function keybindingsPerMode (options, config) {
  const keybindings = {}
  config.forEach(item => {
    if (item.type === 'keybinding') {
      const { mode = 'command', key } = item
      if (keybindings[mode]) {
        keybindings[mode][key] = options[key]
      } else {
        keybindings[mode] = { [key]: options[key] }
      }
    }
  })
  return keybindings
}
