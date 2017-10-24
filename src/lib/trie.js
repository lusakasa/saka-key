/**
 * A Trie datastructure that uses a simple javascript object for its underlying storage.
 * It doesn't generate the input tree for you, you MUST generate it yourself.
 * This trie is designed for Saka Key's needs and ISN'T general purpose.
 * An example input tree is:
 * {
 *   "c": {
 *     "a": {
 *       "t": "Tom",
 *       "r": "Tarzan"
 *     }
 *   },
 *   "d": {
 *     "o": {
 *       "g": () => console.log("My dog's name is Harris")
 *     }
 *   }
 * }
 */
export default class Trie {
  /**
   * Creates a trie
   * @param {Object} root - A simple javascript object representing a trie
   */
  init = root => {
    this.root = root
    this.curNode = root
  }
  /** Sets the root to current node to the root node */
  reset = () => {
    this.curNode = this.root
  }
  static INTERNAL = Symbol('INTERNAL')
  static INVALID = Symbol('INVALID')
  /**
   * Advances the command trie based on the input string. In Saka Key, this
   * input string is usually the string representation of a keyboard event
   * @param {string} input
   */
  advance = input => {
    const next = this.curNode[input]
    if (typeof next == 'undefined') {
        this.curNode = this.root
        return this.root[input] === undefined
          ? Trie.INVALID
          : this.advance(input)
    } else if (next._TrieNode === true) {
        this.curNode = next
        return Trie.INTERNAL
    } else {
        this.curNode = this.root
        return next
    }
  }
}
