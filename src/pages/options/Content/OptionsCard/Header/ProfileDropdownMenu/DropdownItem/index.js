import { h } from 'preact'

export default ({ label, onClick, color = 'inherit' }) => (
  <li
    className="mdc-list-item"
    role="menuitem"
    tabIndex="0"
    onClick={onClick}
    style={{ color }}
  >
    {label}
  </li>
)
