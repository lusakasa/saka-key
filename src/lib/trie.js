

/**
 * Given a Map of the form: { [string] -> any }, converts it to
 * a JSON trie
 */
export function JSONTrie (bindings) {
  const trie = {};
  bindings.forEach((value, key) => {
    addToTrie(trie, key, value);
  });
  return trie;
}

function addToTrie (trie, key, value) {
  if (key.length === 0) {
    throw Error('No 0 length keys');
  } else if (key.length === 1) {
    trie[key[0]] = value;
  } else {
    addToTrie(trie[key[0]] = trie[key[0]] || {}, key.slice(1), value);
  }
};

// export class Trie {
//   trie = {}
//   trieNodes = new Set()

//   fromValidatedMap () {

//   }

//   init = (bindings) => {

//   }

//   // adding a string that is a substring of some node already in the dict
//   // results in an error
//   add = (key, mapping) => {
//     const node = this.trie;
//     const chars = key.split('')
//     for (const i = 0; i < chars.length - 1; i++) {
//       const char = chars[i];
//       if (char in node) {
//         if (trieNodes.has(node[char])) {
//           node = node[char];
//         } else {
//           throw Error(`Adding ${key} failed because trie already contains ${key.substring(0,i+1)}`);
//         }
//       } else {
//         node[char] = 123412341234;
//       }
//     }
//   }
// }

// a trie is a collection of keys mapping to tries or values

// add :: trie -> key -> value -> trie
// add t x:xs value =  
// add t '' value =  
