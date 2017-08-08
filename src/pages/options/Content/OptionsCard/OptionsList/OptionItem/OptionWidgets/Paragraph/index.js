import { Component, h } from 'preact';

export default class Paragraph extends Component {
  render ({ text }) {
    return (
      <li>
        <pre className='mdc-card__subtitle'
          style={{whiteSpace: 'pre-wrap', margin: '10px auto'}}
        >
          { text }
        </pre>
      </li>
    );
  }
}
