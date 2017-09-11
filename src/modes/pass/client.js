import { initInputTrie, resetInputTrie, advanceInputTrie } from './trie'

// Notes: The keydown event that enters this mode has a corresponding keyup
// event that should be ignored. Passing a single key is terminated on the
// keyup event to ensure any page handlers for the keyup event are triggered.

let passKeysLeft

export default {
  onOptionsChange: options => {
    initInputTrie(options.passBindings)
  },
  onEnter: event => {
    if (event.passKeyType === 'all') {
      passKeysLeft = -1
      resetInputTrie()
    } else {
      passKeysLeft = 2
    }
  },
  keydown: event => (passKeysLeft === -1 ? advanceInputTrie(event) : 'Same'),
  keyup: event =>
    passKeysLeft !== -1 && --passKeysLeft === 0 ? 'Reset' : 'Same',
  blur: () => 'Reset',
  focus: () => 'Reset'
}
