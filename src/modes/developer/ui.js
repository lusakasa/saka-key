import { render, Component, h } from 'preact';
import { msg } from 'mosi/client';

const style = `
.DeveloperMenu {
  all: initial;
  position: fixed;
  left: 0px;
  top: 0px;
  background-color: white;
}
.EventsList {
  height: 250px;
  overflow: scroll;
}
`;

export function showMenu () {
  const developerMenuContainer = document.createElement('div');
  developerMenuContainer.id = 'sakaDeveloperMenuContainer';
  developerMenuContainer.style = 'position: absolute; left: 0; top: 0; background-color: white;';
  document.documentElement.appendChild(developerMenuContainer);
  const shadow = developerMenuContainer.attachShadow({mode: 'open'});
  shadow.innerHTML = `<style>${style}</style>`;
  render(<DeveloperMenu />, shadow);
}

export function hideMenu () {
  document.querySelector('#sakaDeveloperMenuContainer').remove();
}

function exitDeveloperMode () {
  msg(0, 'changeMode', {
    mode: 'Reset',
    reason: 'developerModeExit'
  });
}

export class DeveloperMenu extends Component {
  constructor () {
    super();
    this.state = {
      left: 0,
      top: 0,
      lastDragEvent: { left: 0, top: 0 }
    };
  }

  // TODO: lastDragEvent is used as a quick fix for a bug in which the final drag event always gets
  // coordinates 0, 0. This solution is a (noticable) hack, but... developer mode has the BASIC
  // functionality i want and i'd rather work on other features for now.
  onDrag = (event) => {
    this.setState({
      left: this.state.lastDragEvent.clientX || 0,
      top: this.state.lastDragEvent.clientY || 0,
      lastDragEvent: event
    });
  }
  render () {
    return (
      <div
        className='DeveloperMenu'
        style={{ left: this.state.left + 'px', top: this.state.top + 'px' }}>
        <div style={{backgroundColor: 'blue', height: '30px'}} draggable='true' onDrag={this.onDrag} />
        <h1> Developer Menu </h1>
        <button onClick={exitDeveloperMode}> Exit </button>
        <div>
          <EventsExplorer />
        </div>
      </div>
    );
  }
};

class EventsExplorer extends Component {
  constructor () {
    super();
    this.state = {
      captureState: 'uninitialized',
      events: [],
      captureTypes: []
    };
  }
  componentDidMount () {
    const defaultCaptureTypes = [
      'keydown',
      'keypress',
      'keyup',
      'scroll'
    ];
    defaultCaptureTypes.forEach((type) => {
      this.addCaptureType(type);
    });
    this.setState({
      captureState: 'play'
    });
  }
  pushEvent = (event) => {
    this.setState({
      events: this.state.events.concat(event)
    });
  }
  addCaptureType = (type) => {
    window.addEventListener(type, this.pushEvent, true);
    this.setState({
      captureTypes: this.state.captureTypes.concat(type)
    });
  }
  removeCaptureType = (type) => {
    window.removeEventListener(type, this.pushEvent, true);
    this.setState({
      captureTypes: this.state.captureTypes.filter((captureType) => captureType !== type)
    });
  }
  recordEvent = (event) => {
    this.setState({
      events: this.state.events.concat(event)
    });
  }
  clearEvents = () => {
    this.setState({
      events: []
    });
  }
  render () {
    return (
      <div>
        <h2> Events Explorer </h2>
        <EventsViewControls
          clearEvents={this.clearEvents}
          captureTypes={this.state.captureTypes}
          addCaptureType={this.addCaptureType}
          removeCaptureType={this.removeCaptureType} />
        <h2> Events List </h2>
        <EventsList
          events={this.state.events} />
      </div>
    );
  }
}

class EventsViewControls extends Component {
  constructor () {
    super();
    this.state = {
      newTypeValue: ''
    };
  }
  updateNewTypeValue = (event) => {
    console.log(event);
    this.setState({ newTypeValue: event.target.value });
  }
  tryAddNewType = (addCaptureType) => () => {
    addCaptureType(this.state.newTypeValue);
    this.setState({ newTypeValue: '' });
  };
  render ({ clearEvents, captureTypes, addCaptureType, removeCaptureType }) {
    return (
      <div>
        <div>
          <h3> Controls </h3>
          <button onClick={clearEvents}> Clear Events </button>
        </div>
        <div>
          <h3> Capture Types </h3>
          <input value={this.state.newTypeValue} onInput={this.updateNewTypeValue} />
          <button onClick={this.tryAddNewType(addCaptureType)}> Add Event Type </button>
          <ul>
            { captureTypes.map((type) => (
              <li>
                { type }
                <button onClick={() => removeCaptureType(type)}> X </button>
              </li>
            )) }
          </ul>
        </div>
      </div>
    );
  }

}

class EventsList extends Component {
  render ({ events }) {
    return (
      <ul className='EventsList'>
        { events
            .filter((event) => true)
            .map((event) => (
              <li>
                { event.type }
                <button onClick={() => console.log(event)}>log to console</button>
              </li>
            ))}
      </ul>
    );
  }
  componentWillUpdate () {
    // preact's equivalent to this.findDOMNode() is this.base
    const node = this.base;
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }
  componentDidUpdate () {
    if (this.shouldScrollBottom) {
      const node = this.base;
      node.scrollTop = node.scrollHeight;
    }
  }
}

