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

* Decision: use a single key event listener

* Motivation: try to understand Vimium's handler stack

---

* Decision: Store key combinations as `e.code + e.key + e.shiftKey +  e.ctrlKey + e.altKey + e.metaKey`. Show keys to user as `(mapping(e.code, e.shiftKey) || e.key) + e.ctrlKey + e.altKey + e.metaKey`. See [Mappings](./KeyboardEvent.code.mappings.json). Decode KeyEvents using `e.key + e.shiftKey +  e.ctrlKey + e.altKey + e.metaKey`

* Motivation: As far as I can tell, (code | key) & allModifiers is the only unique way to identify a key without using an attribute that will be depracated. Showing the .key attribute will really confuse people since the option key can affect the value of .key (option + j = ∆; option + shift + j = Ô) and the .code attribute values are too long and complicated. To minimize the size of the bindings trie that must be transfered on every page load, use .key for decoding instead of .code.

---

* Decision: Scrollable elements are selectable

* Motivation:

---

