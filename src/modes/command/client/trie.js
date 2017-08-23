import 'lib/browser_polyfill';
import Trie from 'lib/trie';
import * as commands from './commands';
import { keyboardEventString } from 'lib/keys';

const trie = new Trie();

export function initInputTrie (root) {
  trie.init(root);
}

export function resetInputTrie () {
  trie.reset();
}

export function advanceInputTrie (event) {
  const command = trie.advance(keyboardEventString(event));
  if (command) {
    const nextMode = commands[command](event);
    if (nextMode) {
      return nextMode;
    }
  }
  return 'Same';
}
