import { keyboardEventString } from 'lib/keys';

class CommandTrie {
  init (bindings) {
    this.root = bindings;
    this.curNode = bindings;
  }
  reset () {
    this.curNode = this.root;
  }
  /**
   * Advances the command trie based on the command key event.
   * If a leaf node, corresponding to a command, has been reached,
   * returns the command.
   * Otherwise returns undefined
   */
  advance (event) {
    const key = keyboardEventString(event);
    // TODO: Update to use longest viable prefix by trying
    // longest prefix until a valid path is found
    const next = this.curNode[key] || this.root[key] || this.root;
    // Case 1. A trie node
    if (typeof next === 'object') {
      this.curNode = next;
      return undefined;
    // Case 2. A trie leaf corresponding to the command reached
    } else {
      this.curNode = this.root;
      return next;
    }
  }
}

export const commandTrie = new CommandTrie();
