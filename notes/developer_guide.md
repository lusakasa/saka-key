# Developer Guide

Warning: Details are glossed over and Saka Key is still a young project with lots of room to grow and change. Refer to the source code for definitive answers.

## Index

* [Components](#components)
  * [Client](#client)
  * [Background](#background)
  * [Settings](#settings)
* [Example flow](#example-flow)

## Components

Saka Key comprises:

* a client that runs on every frame of every page
* a persistent background page
* an options page for user-specified settings

### Client

The client is structured as a state machine. Developers can create modes, which correspond to states in the state machine. The important built in modes are:

* Basic - the default start/disabled state
* Text - the state that is active when a text input is focused 
* Command - allows entering keyboard commands for things like scrolling and switching tabs
* Pass - forwards all events to the page so that you can use a page's built-in keyboard shortcuts
* Hints - the state that is enabled when the user is selecting a link hint

DOM events trigger mode changes. E.g. if the current mode is Command, then clicking a text input will result in a transitin to Text mode. Messages can also trigger mode changes.

Each mode is given its own directory at ./src/modes/modeName. Within each mode directory is a file named client.js. This file should export a single mode object with the following properties:

* **onEnter(event)** - a function called when the mode is entered
* **onExit(event)** - a function called when the mode is exited
* **onSettingsChange(settings)** - a function called when the client first loads and when the user changes a setting
* events - an object containing callbacks that are executed when events occur. The string returned by the callback is the next mode. The following callbacks are provided:
* **keydown(event)** - a function called when a keydown event is detected, returns the next mode
* **keypress(event)** - a function called when a keydown event is detected, returns the next mode
* **keyup(event)** - a function called when a keydown event is detected, returns the next mode
* **focusin(event)** - a function called when a keydown event is detected, returns the next mode
* **focusout(event)** - a function called when a keydown event is detected, returns the next mode
* **click(event)** - a function called when a keydown event is detected, returns the next mode
* **mousedown(event)** - a function called when a keydown event is detected, returns the next mode
* **messages** - an object containing callback that are executed when messages are received. Messages may be sent by the background page, another mode on the same page, or by a client on a completely different tab. The string returned by the callback is the next mode. Each callback takes an argument and a source id. See [mosi](https://github.com/eejdoowad/mosi) for details. To use mosi's get() functionality, return an object of the form `{ nextMode, value }`. See Hints mode for an example.

All  properties are optional and asynchronous (you can use an async function that returns a promise). The default implementation is

The type definition is:

```typescript
interface Mode {
  // called when mode is entered, passed event that triggered mode change
  onEnter?: async (event: Event) => void,
  // called when mode is exited, passed event that triggered mode change
  onExit?: async (event: Event) => void,
  // called when a setting is updated, passed new settings object
  onSettingsChange?: ({ [key: string]: any }) => {},
  // called on every keydown event, passed keydown event, returns next mode
  keydown?: async (event: KeyboardEvent) => string,
  // called on every keypress event, passed keypress event, returns next mode
  keypress?: async (event: KeyboardEvent) => string,
  // called on every keyup event, passed keyup event, returns next mode
  keyup?: async (event: KeyboardEvent) => string,
  // called on every blur event, passed blur event, returns next mode
  blur?: async (event: FocusEvent) => string,
  // called on every focus event, passed focus event, returns next mode
  focus?: async (event: FocusEvent) => string,
  // called on every keydown event, passed keydown event, returns next mode
  click?: async (event: MouseEvent) => string,
  // called on every keydown event, passed keydown event, returns next mode
  mousedown?: async (event: MouseEvent) => string,
  // contains message callbacks, returns next mode and optionally mosi get() value
  // https://github.com/eejdoowad/mosi
  messages?: {
    [key: string]: (arg: any, src: number) => undefined | string | {
      nextMode: string,
      value: any
    }
  }
}
```

The default implementation for each property is:

```javascript
const defaultModeObject = {
  onEnter: () => {},
  onExit: () => {},
  onSettingsChange: () => {},
  keydown: () => 'Same',
  keypress: () => 'Same',
  keyup: () => 'Same',
  blur: () => 'Same',
  focus: () => 'Same',
  click: () => 'Same',
  mousedown: () => 'Same',
  messages: {}
};
```
### Background

Modes may require access to privileged APIs only accessible on the background page or information only the background page has. This means the client mode must send a message to the background page. But once the message gets to the background page, what handles the message?

Each mode has a component that lives in background page! Within each modes directory is a file named background.js. This file should export a single object with the following properties:

* **onInstalled(reason)** - a function that is called when the [install event](https://developer.chrome.com/extensions/runtime#event-onInstalled) is triggered.
* **clientSettings(options, settings)** - a function that is called whenever any setting is changed. This should return an object with two properties: values - an object containing the key-value pairs that should be forwarded to every client, and errors - an object containing error strings for keys whose values are invalid.
* **messages** - like the client-side messages property, but always returns values (for mosi get()) never the next mode (because the state machine lives in clients, not the background page).

The type definition is:

```typescript
interface ModeBackground {
  // called when chrome.runtime.onInstalled is fired, passed install reason
  // https://developer.chrome.com/extensions/runtime#event-onInstalled
  onInstalled?: (reason: string) => void,
  // called when the user updates a setting, passes the mode's options object
  // defined in config.json and the key-value pairs for all modes, returns
  // * values - the key-value pairs passed to every client
  // * errors - the error strings for settings that failed validation
  clientSettings?: (options: Object, settings: { [key: string]: any }) => ({
    values: { [key: string]: any },
    errors: { [key: string]: string }
  }),
  // contains message callbacks, returns the mosi get() value
  // https://github.com/eejdoowad/mosi
  messages?: {
    [key: string]: async (arg: any, src: number) => any
  }
};
```

The default implementation is:

```javascript
const defaultModeObject = {
  onInstalled: () => {},
  clientSettings: () => ({ values: {}, errors: {} }),
  messages: {}
};
```

### Settings

Saka Key is engineered to make adding modes as easy as possible. Mode authors don't have to write any code to get user configurable options!

Within each mode directory is a file named config.json. This JSON file contains an array of options. Each option has a type (e.g. switch, checkbox, textarea), a label, and a key.

```JSON
"options": [
    {
      "type": "switch",
      "label": "Saka Key Enabled",
      "key": "enabled"
    },
    {
      "type": "color",
      "label": "Primary Color",
      "key": "primaryColor"
    }
]
```
These options are used to generate a GUI on the options page.

![example](options_gui_example.png)

When a setting on the options GUI is changes, the clientSettings callback on the background page is called and passed an object containing the values for each key for that mode.

Each mode directory also contains a file named 'default.json', which contains default settings for each key.

```JSON
"settings": {
  "enabled": true,
  "primaryColor": "#ff4488"
}
```

## Example Flow

1. User loads a new page by clicking a link

2. The page begins to load. This page only has a single top level frame

3. A content script bootstrapper in the frame sends a message to the background page, requesting the full client

4. The background page gets the messge, then dynamically loads the full client into the frame

5. The client initializes its full messaging subsystem, calls setup routines, and sets the start state to Basic (which is the disabled state).

6. The client sends a message to the background page requesting user-defined settings

7. The background page receives the request, examines the clients url and determines the appropriate settings to forward to the client. The settings sent to the client are calculated using the user-defined settings specified on the options page, and are cached in the background page's memory.

8. The client receives the settings, and calls every mode's onSettingsChange callback.

9. Mode Basic observes the 'enabled' setting is true, and changes the mode to Command.

10. The user presses 'j' to scroll down. Command mode knows that 'j' is for scrolling down because all keybindings were specified in the settings passed to its onSettingsChange callback.

11. The user presses 'f'.  This results in a transition to Hints mode. The user enters 'a' then 'd', which activates an html text input.

12. The focusin event triggers a mode change to Text mode.

13. The user types their name in, then hits tab to exit the text input.

14. The focusout event triggers a mode change to Command mode.

15. The user presses 'r' to switch to the next tab.

16. The next tab contains an independent Saka Key client that is currently in Command mode.

17. The user presses 'x' to close the tab.

18. The user returns to the original tab, which is still in Command Mode.

19. The user presses 'x' to close the tab.

20. Finito.
