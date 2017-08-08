import { h } from 'preact';
import KeybindingItem from './KeybindingItem';

export default ({ bindings, physicalKeys, ignoreModifierKeys }) => (
  <span>
    { bindings && bindings.map((binding, i) =>
      <span>
        <KeybindingItem
          binding={binding}
          physicalKeys={physicalKeys}
          ignoreModifierKeys={ignoreModifierKeys}
        />
        { i === bindings.length - 1 ? '' : <span>, </span>}
      </span>) }
  </span>
);
