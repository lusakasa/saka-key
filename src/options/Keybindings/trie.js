import { validKeyboardEvent, keyboardEventString } from 'lib/keys'

/**
 * Given an object mapping commands to their key bindings,
 * returns the trie representation.
 */
export function generateCommandTrie (commandList) {
  return JSONTrie(bindingsList(commandList))
}

/**
 * Given an object mapping commands to their key bindings,
 * returns an array of (commands, binding).
 * A command may have more than one binding, or none at all.
 */
function bindingsList (commandList) {
  const out = []
  for (const command of commandList) {
    if (command.bindings === undefined) {
      throw Error(`A profile is missing bindings for command ${command.command}`)
    }
    for (const binding of command.bindings) {
      const keySequence = binding.map(key => {
        try {
          validKeyboardEvent(key)
        } catch (e) {
          throw Error(`Invalid KeyboardEvent descriptor for ${command}`)
        }
        return keyboardEventString(key)
      })
      out.push([keySequence, command, binding])
    }
  }
  return out
}

/**
 * Given an array of (command, binding),
 * returns the trie representation.
 */
function JSONTrie (bindings) {
  const trie = {}
  bindings.forEach(([key, value, binding]) => {
    addToTrie(trie, 0, key, value, binding)
  })
  return trie
}

function isTrieNode (thing) {
  return typeof thing == 'object' && thing._TrieNode === true
}

function addToTrie (trie, i, key, value, binding) {
  if (key.length === 0) {
    throw Error(`${value} has a 0 length key binding`)
  } else if (i === key.length - 1) {
    if (isTrieNode(trie[key[i]])) {
      throw {
        message: `${firstLeafValue(
          trie[key[i]]
        )} and ${value} have conflicting mapping`,
        type: 'conflict',
        command1: trie[key[i]],
        command2: value
      }
    } else {
      trie[key[i]] = value
    }
  } else {
    if (isTrieNode(trie[key[i]])) {
      if (typeof trie[key[i]] === 'object') {
        addToTrie(trie[key[i]], i + 1, key, value)
      } else {
        throw {
          message: `${trie[key[i]]} and ${value} have conflicting prefix`,
          type: 'conflict',
          command1: trie[key[i]],
          command2: value
        }
      }
    } else {
      addToTrie((trie[key[i]] = {_TrieNode: true}), i + 1, key, value)
    }
  }
}

function firstLeafValue (trie) {
  return typeof trie === 'object'
    ? firstLeafValue(trie[Object.keys(trie)[0]])
    : trie
}
