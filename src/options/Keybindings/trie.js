import { validKeyboardEvent, keyboardEventString, friendlyKeyboardEventString } from 'lib/keys';

/**
 * Given an object mapping commands to their key bindings,
 * returns the trie representation.
 */
export function generateCommandTrie (commandMap) {
  return JSONTrie(bindingsList(commandMap));
}

/**
 * Given an object mapping commands to their key bindings,
 * returns an array of (commands, binding).
 * A command may have more than one binding, or none at all.
 */
function bindingsList (bindingsMap) {
  const out = [];
  for (const [command, bindings] of Object.entries(bindingsMap)) {
    for (const binding of bindings) {
      const keySequence = binding.map((key) => {
        try {
          validKeyboardEvent(key);
        } catch (e) {
          throw Error(`Invalid KeyboardEvent descriptor for ${command}`);
        }
        return keyboardEventString(key);
      });
      out.push([keySequence, command, binding]);
    }
  }
  return out;
}

/**
 * Given an array of (command, binding),
 * returns the trie representation.
 */
function JSONTrie (bindings) {
  const trie = {};
  bindings.forEach(([key, value, binding]) => {
    addToTrie(trie, 0, key, value, binding);
  });
  return trie;
}

function addToTrie (trie, i, key, value, binding) {
  if (key.length === 0) {
    throw Error(`${value} has a 0 length key binding`);
  } else if (i === key.length - 1) {
    if (trie.hasOwnProperty(key[i])) {
      throw {
        message: `${firstLeafValue(trie[key[i]])} and ${value} have conflicting mapping`,
        type: 'conflict',
        command1: trie[key[i]],
        command2: value
      };
    } else {
      trie[key[i]] = value;
    }
  } else {
    if (trie.hasOwnProperty(key[i])) {
      if (typeof trie[key[i]] === 'object') {
        addToTrie(trie[key[i]], i + 1, key, value);
      } else {
        throw {
          message: `${trie[key[i]]} and ${value} have conflicting prefix`,
          type: 'conflict',
          command1: trie[key[i]],
          command2: value
        };
      }
    } else {
      addToTrie(trie[key[i]] = {}, i + 1, key, value);
    }
  }
};

function firstLeafValue (trie) {
  return typeof trie === 'object'
    ? firstLeafValue(trie[Object.keys(trie)[0]])
    : trie;
}
