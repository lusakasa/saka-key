# Saka Key Engineering

This document describes design decisions made in Saka Key and why they were made. If a reason is false or no longer holds, change the design.

## Mission

1. Easy to use. Not focused on 'hackers'
    * GUI controls whenever possible
      * help menu
      * tab selection (pane)
    * High discoverability
      * help on ? and under popup
      * simple key mappings
    * Predictability
      * commands only and always activate when user initiates
      * works on all pages
      * 
    * Reliability
    * Good default settings
    * Pretty and themable

2. Clean, organized, approachable code
    * es6, npm, webpack, preact, modern toolchain
    * webpack modules with simple config
    * documentation
    * mosi for all messaging
    * code things the simplest, easiest to understand way possible
    * learn from design of Vimium, cVim, and others

3. 100% Extensible
    * many modes are built in for performance
    * but it is possible to implement them all as external extensions
    * You can use saka key as a generic key mapper for any extension


## Design Decisions and Reasons

### Misc

---

* Decision: small content_script_loader loads into each frame and only load full content script if frame is large enoough

* Motivation: because vimium says it's slow to load the content script into some pages which have many tiny frames

---

* Decision: load content script into every page even when saka key is disabled

* Motivation: allows for turning saka key back on immediately without messy page refreshes. the idea is disabling sakakey will be temporary and the user will likely turn it back on soon

---

* Decision: graphical tabs overview

* Motivation: easier to understand and overview than text

---

* Decision: all gui's constructed with preact

* Motivation: intuitive, lower-overhead, fast, composable

---

### Event handling

* Decision: Use a single listener for each type of event  and a state machine.

* Motivation: Try to understand Vimium's handler stack. The wrong data structure led to incomprehensible control flow.

---

* Decision: Listen for focusin and focusout instead of focus and blur.

* Motivation: unlike focus and blur, focusin and focusout events bubble, allowing a single high level listener to detect focus changes on all elements of the document.

---

Decision: Always perform keyboard event handling in the keydown event, not the keypress event

Motivation: In Chrome, non-printing keys like escape don't trigger keypress events. In firefox, they do. To get the same behavior on all platforms, avoid putting control logic in keypress event handlers.

--

* Decision: Store key combinations as `e.code + e.key + e.shiftKey +  e.ctrlKey + e.altKey + e.metaKey`. Show keys to user as `(mapping(e.code, e.shiftKey) || e.key) + e.ctrlKey + e.altKey + e.metaKey`. See [Mappings](./KeyboardEvent.code.mappings.json). Decode KeyEvents using `e.key + e.shiftKey +  e.ctrlKey + e.altKey + e.metaKey`

* Motivation: As far as I can tell, (code | key) & allModifiers is the only unique way to identify a key without using an attribute that will be depracated. Showing the .key attribute will really confuse people since the option key can affect the value of .key (option + j = ∆; option + shift + j = Ô) and the .code attribute values are too long and complicated. To minimize the size of the bindings trie that must be transfered on every page load, use .key for decoding instead of .code.

---

### Scrolling

* Decision: Scrolling - do it the Vimium way mostly

* Motivation: Their answer to qustions on scrolling work mostly
  
---

* Decision: A scrollable element is determined by attempting to scroll it and seeing if its position changes.

* Motivation: other more straighforward ways don't work according to Vimium's comments and issues.

---

* Decision: The default scrolling element is the body. If the body isn't scrollable, the default is the largest scrollable element.

* Motivation: The body of some pages doesn't scroll. This is a good alternative selection.

---

* Decision: Scrollable elements are selectable.

* Motivation: This lets you scroll them. Otherwise the scroll focus would be stuck on the body.

---

* Decision: Start smooth scrolling animation on keydown and end smooth scrolling animation on key up.

* Motivation: Smooth scrolling is surprisingly tricky to get 'just right.' My early attempts all resulted in scrolling for a fraction of a second, then a tiny pause, then smooth scrolling as you'd expect. I learned that, calling cancelAnimationFrame was a bad idea. I tried a timeout based solution. 

## Modes

1. State Machine

---
Decision: explicit handler for everything but specify fallback modes. Consider finer-grained per-event type fallbacks. For now, just global fallbacks for simplicity.

---

Decision: Should messages be handled by active mode or mode defined in message? For both client and core.

---

Decision: Should global actions that shoud be available regardless of mode, e.g. enabling/disabling saka and showing the help menu, be implemented as modes or hard-coded?

---

Decision: Package help menu into modes

---

Decision: Use CSS position: absolute for link hints (instead of position: fixed).

Motivation: position: fixed is craaaazy slow

---

Decision: Mount hints to dedicated element mounted to <html> instead of to parent of link.

Motivation: While mounting hints to the parent of their link is more accurate because the hints stay in the correct place when the user scrolls, it's much slower to mount them. Also, there are many corner cases (e.g. absolute positioning within <tr> elements doesn't work the way you expect). Also, the normal behavior is for the user to select a link or cancel selecting a hint, not continuing scrolling.

---

Decision: Use shadow DOM for link hints on browsers that support it (only Chrome as of 3/2017), css reset on others.

Motivation: Link hint styling should be independent of any page stylesheets. Encapsulating them in a shadow DOM is the 'right' way to do it. Unfortunately, shadow DOM is only supported by Chrome. I tried a polyfill on firefox, but it just crashed, and it was heavy weight. So, I use Vimium's manual CSS reset strategy for firefox and edge.

---

Decision: Allow users to create per-mode profiles (using a dropdown in the settings for each mode). Allow users to create profile groups, which are composed of a pre-defined profile for each mode. Allow users to shuffle between predefined profile groups using 1) a command mode keyboard shortcut and 2) an iframe with the same GUI that is used on the options page.

Motivation: Gotta do profiles. Just want to do them the right way.

---

Decision: Handle settings changes like this:

1. User makes change to options in Options GUI
2. * Key-value pair for given mode (and profile and value) is stored in chrome.storage.local
     * Currently everything is stored in wide <settings> key
     * Consider storing under <mode::profile> key
       or even under fine-grained <mode::profile::key> key
3. Message is sent to background page indicating a settings change has ben made
4. Options GUI updates to reflect change
5. Background page receives message for change
6. Background page pulls settings from chrome.storage.local
7. Backgroung page calls user-defined onSettingsChange handler for the specified mode,
   passing information about the change (currently the active profile and newSettings)
8. onSettingsChange handler executes and may
   * Change local variables
   * Send messages to to other components
   * Process the new settings and store the results in chrome.storage.local

Examples: 
 * User changes command mode keybinding. Mode handler will regenerate JSON trie, and store it in local storage. If the change is to the active mode, it will send an updateKeybindings message to all Saka Key clients. All clients will fetch the latest keybindings from local storage. All subsequent loads also use the trie in json trie in local storage.
   

Motivation: had to come up with a clear complete understanding of how it works

---

Decision: Each page fetches settings by:

1) Fetch url with url = window.location.href
2) Query activeProfile:

chrome.storage.local('activeProfile')

activeProfile = {
  glob1: {
    mode1: profileA,
    mode2: profileX
  },
  glob2: {
    mode1: profileA,
    mode2: profileY
  }
}
3) get profile of glob matching url

profiles = match(activeProfile, url)

4) Query each profile for matched glob, then send to each mode for handling

// look into whether it's faster to do them all together
Object.entries(profiles).forEach(([profile, mode]) => {
  chrome.storage.local(profile, ({ [profile] }) => {
    updateProfile(mode, profile);
  })
});

5) Add storage listeners on
1) activeProfile (update everything)
2) each profile (update just that profile)


---

Decision: Add visible and validate field to profile options. Specifying visible allows the user to specify a condition that determines whether the option is visibile in the GUI or not. Setting validate to true will send new keyValues to background page for validation, on failure keep the old key value and show an error message to the user.

Motivation:


---

Async state changes:

DOM event hander that return a promise result in no state change, instead when the promise resolves the return value corresponds to the next state. There should be some mechanism to timeout state changes resulting from promise resolution, consider a scheme with 1. a counter that increments when the state changes 2. logic that checks that the count hasn't changed in between when the promise was issued and resolved