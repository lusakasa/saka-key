import { h } from 'preact'
import { friendlyKeyboardEventString } from 'lib/keys'

export default ({ binding, physicalKeys, ignoreModifierKeys }) => (
  <span>
    {binding.map(keyboardEvent => (
      <span className="keybinding-key mdc-typography--body1 mdc-elevation--z2">
        {friendlyKeyboardEventString(
          keyboardEvent,
          physicalKeys,
          ignoreModifierKeys
        )}
      </span>
    ))}
  </span>
)
