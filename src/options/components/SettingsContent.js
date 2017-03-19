import { Component, h } from 'preact';
import ModeCard from './ModeCard';

export default class SettingsContent extends Component {
  render () {
    return (
      <main className='settings-content'>
        <ModeCard />
        <ModeCard />
        <ModeCard />
      </main>
    );
  }
}
