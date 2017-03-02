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

* Decision: Use a single listener for each type of event (keydown, keypress, keyup, focus, blur) and a state machine.

* Motivation: Try to understand Vimium's handler stack. The wrong data structure led to incomprehensible control flow.

---

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

