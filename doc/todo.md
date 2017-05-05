# Todos

* website
* tutorial
* fix settings update bug... it breaks from race condition on color change because
  storage.onChange listener changes storage... switch to messaging background page when setting changes
* better scrolling element logic (must work for tutorial)
* Make sure arrow keys/Escape/Tab/Spacebar always work. Check Netflix.
* embedded feedback textbox for nontechnical users
* safe mode profile for beginning users that only provides commands that are easily reversible or have little impact, e.g. only scrolling, zooming and switching tabs, no closing tabs or going back or forward in history
* add quick disable/enable key binding (to basic)
* screen reader support
  * ChromeVox https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en
  * Aria Landmarks https://github.com/matatk/landmarks
* redo modes GUI: no more profile menu, all keys global, additional category field, options placed in category card, each card has url selection, clientSettings returns { values: { key: value}, errors: { key: error } } (background page writes errors just like values to localstorage), errors rendered above widget, background page uses per-category LRU cache to store generated clientSettings, object.assigns appropriate category pieces based on client url
* add search bar at top of options GUI modes overview
* firefox:
    * figure out why default key actions are suppressed, e.g. cmd+l won't focus the address bar unless saka key is disabled
    * figure out why onStartup event listener doesn't get triggered on temp addon install
* better scrolling
* link hints
    * link hint types: scroll, frames, inputs, select
    * higher quality link hints https://github.com/philc/vimium/issues/2083
    * cached link hints
    * always on https://addons.mozilla.org/en-us/firefox/addon/mouseless-browsing/
    * under tabs
    * alternative 'progressive' algorithms
    * pre-rendering, caching
* figure out why disabling saka breaks google search (doesn't let you change focus away from search input)
* handle browser restart/update properly
* configurable key bindings
* commands: mute Other tabs, mute tab X (easier with below)
* historical tab switching
* full screen mode (provide custom tabs/url bar optimized for alt interface)
* more commands
* check out extensions: evernote webclipper
* configurable themes and colors
* multiple configuration profiles
* sharable themes and configurattion
* omni bar
* tab switching
* definable commands
* smarter on/off mosi to save power
* pdf.js integration
* emoji keyboard in text mode (activated by pressing and releasing alt key)
* support for vi-like features
* consider extensibility, e.g. https://github.com/philc/vimium/pull/1980#issuecomment-183223423
* add this feature https://www.google.com/patents/US5818423 when the patent expires
* also add rulers http://redstartsystems.com/videos
* lots of other cool things http://redstartsystems.com/papers
* create an API for websites to register custom keybaord/voice events. 
* add per domain settings to KeyboardEvent Input Type
* 
* interoperation with other accessibility features, see accessibility.md
  * breaks with NVDA screen reader
* figure out compatibility with touch screens
  * consider pointer api instead of mouse events


* think about whether to handle keyboard events on keydown or keypress

* smaller link hints or smaller elements?