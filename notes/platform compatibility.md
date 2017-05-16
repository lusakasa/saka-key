Saka Key targets chrome and firefox, and maybe one day edge.

Here are some browser inconsistences that affect how it works:

# Shadow DOM

Only chrome supports this. Ideally, link hints will be contained within a shadow dom container to isolate them from page stylesheets. The alternative on firefox and edge is to reset all reset styles on link hints.

# Keybaord events

A nightmare on firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=380637
... a 10 year old bug discussion on the right way to handle built-in shortcut behaviors that is still alive


https://bugzilla.mozilla.org/show_bug.cgi?id=1052569

On Chrome, the default behavior of keybaord events is limited to DOM manipulation. On firefox, core functionality not related to the DOM is implemented through the default behavior of events. This has the unfortunate side affect of allowing the page to block basic functionality like refreshing the page, selecting the url bar, activating the find menu, and performing select all, simply by calling preventDefault() on the keypress event. This has to be a bug.

Actions triggered by default behaviors on firefox:
* ctrl+r - refresh page
* ctrl+l - select the url bar
* ctrl+a - select all
* ctrl+f - select the find menu

Actions that are probably triggered by default behaviors but for which the behavior is never realistically encountered


Actions that aren't triggered by default behaviors:
* ctrl+t - open a new tab
* ctrl+w - close the current tab

Escape generates a keypress event in firefox but not in chrome