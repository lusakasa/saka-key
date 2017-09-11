import { initInputTrie, resetInputTrie, advanceInputTrie } from './trie'
import { initScrolling, cancelScroll } from './commands/scroll/utils'
import { setKeyboardSettings, isModifierKey } from 'lib/keys'

export default {
  onEnter: event => {
    resetInputTrie()
  },
  onOptionsChange: options => {
    setKeyboardSettings(options.physicalKeys, options.ignoreModifierKeys)
    initInputTrie(options.commandBindings)
    initScrolling(options.smoothScroll, options.scrollStep)
  },
  keydown: event => (isModifierKey(event) ? 'Same' : advanceInputTrie(event)),
  keyup: event => {
    // TODO: decide whether/how to suppress this
    event.stopImmediatePropagation()
    cancelScroll()
    return 'Same'
  },
  blur: () => 'Reset',
  focus: () => 'Reset'
}
