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
  const keybindings = { command: [], pass: [] }
  config.forEach(item => {
    if (item.type === 'keybinding') {
      const { mode = 'command', key } = item
      keybindings[mode].push({ bindings: options[key], command: key })
    }
  })
  options.customCommands.forEach((item, i) => {
    const { mode = 'command', source, bindings } = item
    keybindings[mode].push({
      bindings,
      command: "customCommand",
      source,
      preventDefault: true,
    })
  })
  return keybindings
}
