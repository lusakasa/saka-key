---
id: resources
title: Resources
sidebar_label: Resources
---

## Events

* [Events](https://developer.mozilla.org/en-US/docs/Web/Events)

### Keyboard Events

The following is the subset of their behavior relavant to Saka key.
Understand the following before writing key event handlers:

1. keydown
    * Dispatched when any key is pressed, including tab, shift, escape and backspace.
    * Default behahaviour will launch the keypress event (and other stuff)
    * e.g. if you call preventDefault(), no keypress() event will be dispatched.
2. keypress
    * Dispatched by a keydown event's default handler, if the key is a character value
    * e.g. shift and tab won't trigger a keypress
    * Dispatched after keypress (assuming preventDefault() isn't called) and before keyup
    * Default behavior will enter character if dispatched to input[text]/textarea/contenteditable
    * Apparently depracated in favor of beforeinput event... but oh well
3. keyup
    * Dispatched when any key is released, including tab, shift, escape and backspace.
    * No default action

* https://www.w3.org/TR/DOM-Level-3-Events
* https://www.w3.org/TR/DOM-Level-3-Events/#keydown
* https://www.w3.org/TR/DOM-Level-3-Events/#keypress
* https://www.w3.org/TR/DOM-Level-3-Events/#keyup
* [KeyboardEvent codes](https://www.w3.org/TR/uievents-code/)

### Scroll Events

* [Scrolling on the web](https://blogs.windows.com/msedgedev/2017/03/08/scrolling-on-the-web/#FfYKZeTKypwBCAAB.97
https://bl.ocks.org/nolanlawson/raw/dc026a93b91cb448401bb0f1cb3ebad2/)


* [Viewport and element widths](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)

### Event Capturing, Bubbling, and Default Behaviors


* https://www.w3.org/TR/DOM-Level-3-Events/#event-flow
* https://www.w3.org/TR/DOM-Level-3-Events/#event-flow-default-cancel
* https://javascript.info/tutorial/bubbling-and-capturing
* https://javascript.info/tutorial/default-browser-action

Default actions are usually performed after the event dispatch has been completed, but in exceptional cases they may also be performed immediately before the event is dispatched.
When an event is canceled, then the conditional default actions associated with the event is skipped (or as mentioned above, if the default actions are carried out before the dispatch, their effect is undone).


### Stopping Event Propagation

You will most likely want to stop event propagation and default behavior using:
1. event.stopImmediatePropagation();
    * Prevents other listeners of the current element for the event from being called AND
      prevents the event from being propogated to other elements.
    * Does NOT affect default behavior.
    * Listeners are called in the order they were added
    * Example: Listener1, listener2, and listener3 for the 'click' event are added to element X.
      The user clicks on X, so a 'click' event e is dispatched to X. First listener 1 is called.
      Then listener 2 is called. Listener2 calls event.stopImmediatePropagation(), so listener3
      is not called. e then triggers the default behavior of X. X is contained within an element Y that also has a listener for 'click' events.
      Y's listener is NOT called because stopImmediatePropagation() stops the event from being
      propogated to Y.
2. event.stopPropagation();
    * Prevents the event from being propogated to other elements (for both capturing and bubbling phases)
    * All remaining handlers of the current element still receive the event. Other elements just don't
      get the event.
    * Does NOT affect default behavior.
    * Example: Listener1, listener2, and listener3 for the 'click' event are added to element X.
      The user clicks on X, so a 'click' event e is dispatched to X. First listener 1 is called.
      Then listener 2 is called. Listener2 calls event.stopPropagation(). Listener3 is then called
      because stopPropagation() does not cancel the current event's handlers. X is contained within
      an element Y that also has a listener for 'click' events. Y's listener is NOT called because
      stopPropagation() stops the event from being propogated to Y.
3. event.preventDefault();
    * Cancels the event if it is cancelable.
    * Does NOT affect further propagation of the event.
    * TODO: figure out whether default behaviour occurs after bubble up of current element, or after
            complete bubble up of all elements in dispatch path.
    * A cancelled event does not trigger the event's default behavior.
      (e.g. if you type 'a' into a text input but the 'a' keypress event is cancelled, 'a' won't appear)
    * Example: TODO (this is not accurate)
      Listener1, listener2, and listener3 for the 'click' event are added to element X.
      The user clicks on X, so a 'click' event e is dispatched to X. First listener 1 is called.
      Then listener 2 is called. Listener2 calls event.preventDefault(). Listener3 is then called
      because preventDefault() does not cancel the current event's handlers. X is contained within
      an element Y that also has a listener for 'click' events. Y's listener is NOT called because
      stopPropagation() stops the event from being propogated to Y.

### Synchronous and Asynchronous events

* https://www.w3.org/TR/DOM-Level-3-Events/#sync-async

### Synthetic clicks and Activation

https://www.w3.org/TR/html51/editing.html
https://www.w3.org/TR/html51/editing.html#running-synthetic-click-activation-steps


## Test pages

* general html elements: [https://cbracco.github.io/html5-test-page/](https://cbracco.github.io/html5-test-page/)

* iframes: [https://www.w3schools.com/html/html_iframe.asp](https://www.w3schools.com/html/html_iframe.asp)

* scroll box: [https://www.quackit.com/html/codes/html_scroll_box.cfm](https://www.quackit.com/html/codes/html_scroll_box.cfm)

* horizontal scroll: [https://html5up.net/uploads/demos/ethereal/](https://html5up.net/uploads/demos/ethereal/)

* non-standard scroll: [https://androidxref.com/5.0.0_r2/xref/device/htc/flounder/init.flounder.rc](https://androidxref.com/5.0.0_r2/xref/device/htc/flounder/init.flounder.rc)

* lose focus during scroll: [https://github.com/philc/vimium/issues/1526]()

* page that already provides its own bindings [https://groups.google.com/forum/#!forum/buck-build]

* stupid search bar [https://www.macworld.co.uk/apple/](https://www.macworld.co.uk/apple/)

* link hints shown behavior for links that appear on hover is erratic (see drawer and main area) [https://contacts.google.com/](https://contacts.google.com/)

* clickable sandwich icon that isn't detected for link hints [https://aging.nautil.us/feature/218/why-you-cant-help-but-act-your-age](https://aging.nautil.us/feature/218/why-you-cant-help-but-act-your-age)

* another iframe [https://www.economist.com/news/science-and-technology/21718858-arachnids-eat-much-animal-food-all-humans-earth-ecological](https://www.economist.com/news/science-and-technology/21718858-arachnids-eat-much-animal-food-all-humans-earth-ecological)
