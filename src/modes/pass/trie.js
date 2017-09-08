import Trie from 'lib/trie';
import { keyboardEventString } from 'lib/keys';

const trie = new Trie();

export function initInputTrie (root) {
  trie.init(root);
}

export function resetInputTrie () {
  trie.reset();
}

export function advanceInputTrie (event) {
  const next = trie.advance(keyboardEventString(event));
  if (next === undefined) return 'Same'; // if no next trie node
  event.preventDefault();
  event.stopImmediatePropagation();
  return next === 'exitPassMode' ? 'Reset' : 'Same';
}
