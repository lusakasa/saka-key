# Developer Guide

Saka Key comprises:

* a client that runs on every frame of every page
* a persistent background page
* an options page for user-specified settings

## Client

The client is structured as a state machine. Developers can create modes, which correspond to states in the state machine. The important built in modes are:

* Basic - serves as the 'disabled' state, but also handles core logic, e.g. it handles initialization 
* Text - the state that is active when a text input is focused 
* Command - allows entering keyboard commands for things like scrolling and switching tabs
* Hints - the state that is enabled when the user is selecting a link hint

DOM events trigger mode changes. E.g. if the current mode is Command, then clicking a text input will result in a transitin to Text mode. Messages can also trigger mode changes.

Each mode is given its own directory at ./src/modes/modeName. Within each mode directory is a file named client.js. This file should export a single mode object with the following properties:

* name - the name of the mode, e.g. Basic or Command
* onEnter(event) - a function that is called when the mode is entered
* onExit(event) - a function that is called when the mode is exited
* onSettingsChange(settings) - a function that is called when the client first loads and when the user changes a setting
* events - an object containing callbacks that are executed when events occur. The string returned by the callback is the next mode. The following callbacks are provided:
  * keydown(event)
  * keypress(event)
  * keyup(event)
  * focusin(event)
  * focusout(event)
  * click(event)
  * mousedown(event)
* messages - an object containing callback that are executed when messages are received. Messages may be sent by the background page, another mode on the same page, or by a client on a completely different tab. The string returned by the callback is the next mode. Each callback takes an argument and a source id. See [mosi](https://github.com/eejdoowad/mosi) for details.

## Background

Modes may require access to privileged APIs only accessible on the background page or information only the background page has. This means the client mode must send a message to the background page. But once the message gets to the background page, what handles the message?

Each mode has a component that lives in background page! Within each modes directory is a file named background.js. This file should export a single object with the following properties:

* name - the name of the mode, .e.g. Basic or Command
* onInstalled(reason) - a function that is called when the [install event](https://developer.chrome.com/extensions/runtime#event-onInstalled) is triggered.
* clientSettings(options, settings) - a function that is called whenever any setting is changed. This should return an object which will be passed to the client mode's onSettingsChange callback (skipping some details).
* messages - just like the client-side messages property.

## Settings

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

## Warning

Details were glossed over and Saka Key is still a young project with lots of room to grow and change. Refer to the source code for definitive answers.



