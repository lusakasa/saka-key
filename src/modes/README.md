# Modes

## Modes Overview

Each mode in Saka Key has two components:
  1. A client component loaded into every frame of every page
  2. A persistent background page

The client is structured like a state machine. Each mode is a state in this state machine and must define what happens when the mode is entered and exited, and what the next mode is for each event.

Each mode also defines the settings it requires, how those settings should be transformed before being sent to the client component, and what the client component should do with the transformed settings.

See the [developer guide](/notes/developer_guide.md) to learn the details

## Mode Directory Structure

All logic for a given mode is isolated within one directory here. 

For example, Command mode is in *command*, and Hints mode is in  *hints*.

Each mode's directory has the following structure:

* **mode/**
  * **background/**
    * **index.js** - logic that runs in the background page
  * **client/**
    * **index.js** - logic that runs in every frame of every page (in content scripts)
  * **config.json** - describes the mode's settings (used to generate the options page)
  * **default.json** - defines built-in settings profiles

If a mode is simple and has no background page component or settings, it might be simplified to just:

* **mode/**
  * **client.js**

## Mode Client Component

A mode client is an object with the following properties, all of which are optional. Note that message handling is asynchronous and DOM event handling is synchronous. In the past, DOM event handling was asynchronous also, but firefox's [incorrect implementation](https://bugzilla.mozilla.org/show_bug.cgi?id=1193394) of [promises/microtasks](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) forced a switch back to synchronous DOM event handling. If/when this bug is resolved, Saka Key will probably revert to Asynchronous DOM event handling.

```typescript
interface ModeClient {
  // called when mode is entered, passed event that triggered mode change
  onEnter?: (event: Event) => void,
  // called when mode is exited, passed event that triggered mode change
  onExit?: (event: Event) => void,
  // called when a setting is updated, passed new settings object
  onSettingsChange?: ({ [key: string]: any }) => {},
  // called on every keydown event, passed keydown event, returns next mode
  keydown?: (event: KeyboardEvent) => string,
  // called on every keypress event, passed keypress event, returns next mode
  keypress?: (event: KeyboardEvent) => string,
  // called on every keyup event, passed keyup event, returns next mode
  keyup?: (event: KeyboardEvent) => string,
  // called on every blur event, passed blur event, returns next mode
  blur?: (event: FocusEvent) => string,
  // called on every focus event, passed focus event, returns next mode
  focus?: (event: FocusEvent) => string,
  // called on every keydown event, passed keydown event, returns next mode
  click?: (event: MouseEvent) => string,
  // called on every keydown event, passed keydown event, returns next mode
  mousedown?: (event: MouseEvent) => string,
  // contains message callbacks, returns next mode and optionally mosi get() value
  // https://github.com/eejdoowad/mosi
  messages?: {
    [key: string]: async (arg: any, src: number) => undefined | string | {
      nextMode: string,
      value: any
    }
  }
}
```

Each mode provides custom definitions for these properties. If a property is omitted, the following default implementation is used:

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

## Mode Background Component

A mode's background component is an object with the following properties.

```typescript
interface ModeBackground {
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

Each mode provides custom definitions for these properties. If a property is omitted, the following default implementation is used:

```javascript
const defaultModeObject = {
  clientSettings: () => ({ values: {}, errors: {} }),
  messages: {}
};
```
