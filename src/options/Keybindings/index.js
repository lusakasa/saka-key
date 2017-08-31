import { generateCommandTrie } from './trie';
import { getAttributes } from 'lib/util';
import { setKeyboardSettings } from 'lib/keys';

export default (options, config) => {
  const backgroundOptions = getAttributes(options, ['hintChars']);
  const clientOptions = getAttributes(options, ['physicalKeys', 'ignoreModifierKeys']);
  const errors = {};
  if (options.hintChars.length < 2) errors.hintChars = 'A minimum of two hint characters must be specified';
  setKeyboardSettings(options.physicalKeys, options.ignoreModifierKeys);
  const keybindings = {};
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
