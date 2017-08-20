# Modes

## Modes Overview

Saka Key is architected as a state machine in which the states are Saka Key's various modes. At any given time, exactly one mode is active. Each mode defines handlers for events (like keypresses, clicks, and messages) that 1) perform an action (like scrolling or switching tabs) and 2) return the next active mode.

A Saka Key "client" is loaded into every frame of every page. This client comprises:
  1. the set of modes contained within this directory and
  2. the infrastructure needed to manage and switch between modes (contained in `src/client`)

Each mode may include a persistent component that lives in the background page that is shared by all clients. This background component is useful for:
  1. Communicating between frames of a page
  2. Performing privileged actions that can't occur in content scripts
  3. Storing data that should be persisted in memory

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

If a mode is simple and has no background page component or settings, it might be simplified to just:

* **mode/**
  * **client.js**

## Mode Client Component

A mode client is an object with the following properties, all of which are optional. Note that message handling is asynchronous and DOM event handling is synchronous.

```typescript
interface ModeClient {
  // called when mode is entered, passed event that triggered mode change
  onEnter?: (event: Event) => void,
  // called when mode is exited, passed event that triggered mode change
  onExit?: (event: Event) => void,
  // called on all existing modes (not just the active mode) when an option is changed
  onOptionsChange?: ({ [key: string]: any }) => void,
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
  // contains message callbacks which return either
  // 1. the Mosi get() value https://github.com/eejdoowad/mosi or
  // 2. an object containg the nextMode and the Mosi get() value
  messages?: {
    [key: string]: async (arg: any, src: number) => any | {
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
  // called when an option is changed
  onOptionsChange?: ({ [key: string]: any }) => void,
  // contains message callbacks wich returns the mosi get() value https://github.com/eejdoowad/mosi
  messages?: {
    [key: string]: async (arg: any, src: number) => any
  }
};
```

Each mode provides custom definitions for these properties. If a property is omitted, the following default implementation is used:

```javascript
const defaultModeObject = {
  onOptionsChange: () => undefined
  messages: {}
};
```
