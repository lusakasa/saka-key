# Todos

* Add tests and release files
* Figure out why focusing the textbox on https://material.io/icons/ doesn't change modes
* Make commands available in text mode
* Make Tab/Select Widget for assigning keybinding to different modes
* Make command for returning to last focused element
* Add Reset All Settings Option
* Provide link hint activation methods for firefox that don't rely on click events
* implement scrolling pages without smoothscroll polyfill (which is large and can only scroll the scrollingElement, not subelements)
* Make sure arrow keys/Escape/Tab/Spacebar always work. Check Netflix.
* Decouple settings from modes to support more flexible per-domain settings
  * requires implementing settings store in background page that takes a URL and a setting and returns a value
* properly simulate hovers to make mouseover menus usable with link hints
* fix gmail scrolling on firefox
* add quick disable/enable key binding (to basic)
* Figure out all situations in which ports to background page close and add way to gracefully restart.
  * when battery runs out/computer goes to sleep.
  * ? when saka key updates ?
* screen reader support
  * ChromeVox https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en
  * Aria Landmarks https://github.com/matatk/landmarks
* redo modes GUI: no more profile menu, all keys global, additional category field, options placed in category card, each card has url selection, clientSettings returns { values: { key: value}, errors: { key: error } } (background page writes errors just like values to localstorage), errors rendered above widget, background page uses per-category LRU cache to store generated clientSettings, object.assigns appropriate category pieces based on client url
* Add version check to make sure Chrome is new enough to run, http://stackoverflow.com/questions/19294981/how-to-find-the-version-of-chrome-browser-from-my-extension, http://stackoverflow.com/questions/4900436/how-to-detect-the-installed-chrome-version
* add search bar at top of options GUI modes overview
* modify info.html to show release notes and provide quick profile change
* install listener that captures keys that will be passed to full client when it loads
* firefox:
    * figure out why default key actions are suppressed, e.g. cmd+l won't focus the address bar unless saka key is disabled
    * figure out why onStartup event listener doesn't get triggered on temp addon install
* link hints
    * Find hintable elements within shadow dom, e.g. search bar on https://material.io/icons/
    * consider canvas based implementation for maximum rendering performance
    * Add "Ignore Non-accessible Links" option so hints are only shown for elements with the appropriate type/aria role: encourage accessibility and improve speed
    * VimFx- position link hints by finding first text child of hintable element, taking its dimentions ignoring padding/border/margin and translating hint position so its exactly to the left of text
    * VimFx - make hints for important elements shorter (prob based on font weight)
    * VimFX - multiphase hint identification
    * add backspace
    * add final key modifiers
    * Add link activation method that just hovers over a link for use with dropdown on hover menus, example: https://www.numfocus.org/blog/why-is-numpy-only-now-getting-funded/#
    * figure out why the "fork me on github" link on http://www.getferro.com isn't found
    * revise link hints to get fewer false negatives (e.g. on youtube and other video players at certain resolutions)
    * link hint types: scroll, frames, inputs, select
    * higher quality link hints https://github.com/philc/vimium/issues/2083
    * cached link hints
    * always on https://addons.mozilla.org/en-us/firefox/addon/mouseless-browsing/
    * under tabs
    * alternative 'progressive' algorithms
    * pre-rendering, caching
* Key handling
    * add logic that will check the platform/keyboard layout and modify the "key" attribute of the built-in profiles' keybindings based on what char is produced on each platform/layout.
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