import { Component, h } from 'preact';

export default class Paragraph extends Component {
  render ({ text, links = [] }) {
    return (
      <li>
        <pre className='mdc-card__subtitle'
          style={{ whiteSpace: 'pre-wrap', margin: '10px auto', color: 'gray' }}
        >
          { text }
        </pre>
        <ul style={{ paddingLeft: 0 }}>
          { links.map(({ title, url }) =>
            <li style={{ display: 'inline-block', paddingLeft: 0, paddingRight: '12px' }}>
              <a target='_blank' href={url} style={{ textDecoration: 'none', color: '#3f51F5', pointerEvents: url ? 'auto' : 'none' }}>
                { title }
              </a>
            </li>
          )}
        </ul>
      </li>
    );
  }
}
