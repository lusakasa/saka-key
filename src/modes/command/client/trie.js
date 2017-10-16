import 'lib/browser_polyfill'
import Trie from 'lib/trie'
import * as commands from './commands'
import { keyboardEventString } from 'lib/keys'

const trie = new Trie()

export function initInputTrie (root) {
  trie.init(root)
}

export function resetInputTrie () {
  trie.reset()
}

export function advanceInputTrie (event) {
  const command = trie.advance(keyboardEventString(event))
  switch (command) {
    case Trie.INVALID:
      return 'Same'
    case Trie.INTERNAL:
      event.preventDefault()
      event.stopImmediatePropagation()
      return 'Same'
    default:
      event.preventDefault()
      event.stopImmediatePropagation()
      var cmd
      if (command.startsWith('customCommand_')) {
        let id = command.slice(14) // Drop prefix.
        cmd = commands.customCommand.bind(null, id)
      } else {
        cmd = commands[command]
      }
      return cmd(event) || 'Same'
  }
}
