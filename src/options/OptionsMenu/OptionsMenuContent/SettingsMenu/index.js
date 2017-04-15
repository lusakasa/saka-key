import { Component, h } from 'preact';
// import SettingsHeader from './SettingsHeader';
import SettingsDrawer from './SettingsDrawer';
import SettingsContent from './SettingsContent';

const style = {
  margin: '20px 28px',
  position: 'fixed',
  overflowY: 'scroll'
};

export default class SettingsMenu extends Component {
  render () {
    return (
      <div className={'settings-menu'}>
        <div style='display: flex;'>
          <div class='mdc-card' style={style}>
            <SettingsDrawer />
          </div>
          <SettingsContent />
        </div>
      </div>
      /*<div className='mdc-layout-grid'>
        <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-3'>
          <SettingsDrawer />
        </div>
        <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-9'>
          <SettingsContent />
        </div>
      </div>*/
    );
  }
}
