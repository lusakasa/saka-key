import { Component, h } from 'preact';
import ModeCard from './ModeCard';

export default class SettingsContent extends Component {
  render () {
    return (
      <main className='settings-content'>
        <ModeCard mode={{ name: 'basic', description: 'basic' }} />
        <ModeCard mode={{ name: 'command', description: 'command' }} />
        <ModeCard mode={{ name: 'hints', description: 'hints' }} />
        <ModeCard mode={{ name: 'developer', description: 'developer' }} />
      </main>
    );
  }
}
