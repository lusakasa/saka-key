/**
 * Given an array of the form: [[binding, string]], converts it to
 * a JSON trie
 */

export function JSONTrie (bindings) {
  const trie = {};
  bindings.forEach(([key, value]) => {
    addToTrie(trie, 0, key, value);
  });
  return trie;
}

function addToTrie (trie, i, key, value) {
  if (key.length === 0) {
    throw Error(`${value} has a 0 length key binding`);
  } else if (i === key.length - 1) {
    if (trie.hasOwnProperty(key[i])) {
      throw Error(`${trie[key[i]]} and ${value} have conflicting mapping ${key.slice(0, i + 1).join(' ')}`);
    } else {
      trie[key[i]] = value;
    }
  } else {
    if (trie.hasOwnProperty(key[i])) {
      if (typeof trie[key[i]] === 'object') {
        addToTrie(trie[key[i]], i + 1, key, value);
      } else {
        throw Error(`${trie[key[i]]} and ${value} share conflicting prefix ${key.slice(0, i + 1).join(' ')}`);
      }
    } else {
      addToTrie(trie[key[i]] = {}, i + 1, key, value);
    }
  }
};

