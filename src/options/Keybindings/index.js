import { generateCommandTrie } from './trie';
import { getAttributes } from 'lib/util';

export default (options, config) => {
  const backgroundOptions = getAttributes(options, ['physicalKeys', 'ignoreModifierKeys', 'hintChars']);
  const clientOptions = getAttributes(options, ['physicalKeys', 'smoothScroll', 'scrollStep', 'physicalKeys', 'ignoreModifierKeys']);
  const errors = {};
  const keybindings = {};
  if (options.hintChars.length < 2) errors.hintChars = 'A minimum of two hint characters must be specified';
  config.filter((item) => item.type === 'keybinding').forEach((item) => {
    keybindings[item.key] = options[item.key];
  });
  try {
    clientOptions.bindings = generateCommandTrie(keybindings);
  } catch (e) {
    if (e.type === 'conflict') {
      errors[e.command1] = e.message;
      errors[e.command2] = e.message;
    } else throw e;
  }
  return { backgroundOptions, clientOptions, errors };
};
