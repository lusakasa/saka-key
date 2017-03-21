import { h } from 'preact';

const SettingsDrawer = () => (
  <nav class='mdc-permanent-drawer'>
    <div class='mdc-list-group'>
      <nav class='mdc-list'>
        <a class='mdc-list-item' href='#'>Basic</a>
        <a class='mdc-list-item' href='#'>Command</a>
        <a class='mdc-list-item' href='#'>Hints</a>
        <a class='mdc-list-item' href='#'>Developer</a>
      </nav>
      {/* <div class='mdc-permanent-drawer__toolbar-spacer' /> */}
      <hr class='mdc-list-divider' />
      <nav class='mdc-list'>
        <a class='mdc-list-item mdc-permanent-drawer--selected' href='#'>Enable Profile</a>
        <a class='mdc-list-item mdc-permanent-drawer--selected' href='#'>Share Profile</a>
        <a class='mdc-list-item mdc-permanent-drawer--selected' href='#'>Delete Profile</a>
        <a class='mdc-list-item mdc-permanent-drawer--selected' href='#'>GUI Configuration</a>
        <a class='mdc-list-item mdc-permanent-drawer--selected' href='#'>Text Configuration</a>
      </nav>
    </div>
  </nav>
);

export default SettingsDrawer;
