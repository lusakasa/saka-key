export class Trie {
  trie = {}
  trieNodes = new Set()
  init = (bindings) => {

  }

  // adding a string that is a substring of some node already in the dict
  // results in an error
  add = (key, mapping) => {
    const node = this.trie;
    const chars = key.split('')
    for (const i = 0; i < chars.length - 1; i++) {
      const char = chars[i];
      if (char in node) {
        if (trieNodes.has(node[char])) {
          node = node[char];
        } else {
          throw Error(`Adding ${key} failed because trie already contains ${key.substring(0,i+1)}`);
        }
      } else {
        node[char] = 123412341234;
      }
    }
  }
}

// a trie is a collection of keys mapping to tries or values

// add :: trie -> key -> value -> trie
// add t x:xs value =  
// add t '' value =  
