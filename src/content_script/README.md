# Content Scripts

Saka Key's Client - the component that handles the main logic for event handling and modes - is designed so that it can be loaded into a variety of environments:

* content scripts
* extension pages
* the popup

This means that a content script's only job is to request the full client. A web page may comprise multiple frames, and it doesn't make sense to load the full client into frames the user cannot interact with.

**./loader.js** is loaded into every frame of every page. It only loads the full Saka Key client in **./index.js** if a frame CAN be interacted with.

Event listeners must be installed as soon as possible or the page might intercept events before Saka Key can, so **./loader.js** also installs event listeners.
