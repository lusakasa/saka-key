# Release Notes

## 1.15

* Somewhat faster link hints
* Link Hints timeout raised to 10 seconds
* Better compatibility with pages that use Shadow DOM
* Added "Copy Current URL to Clipboard" command with default binding <kbd>y</kbd><kbd>y</kbd>

## 1.14

* Changed to synchronous DOM Event handling for better compatibility with firefox
* Saka Key now works consistently on websites that provide their own keyboard shortcuts, like google groups
* Scrolling on Firefox should now work more consistently (but not yet in the popup or on pages like gmail where the scroll element can't be identified)
* 'Prevent Page from Stealing Focus' setting should now work correctly on Firefox

## 1.13

* Improved performance and smaller bundle size resulting from the move to Webpack 3 and its Module Concatenation Plugin 
* Fixed default hint padding
* New 'power' profile for Basic settings

## 1.12

* New default Link Hints Style that is easier to see and looks nicer (subjectively)
* Minimum font-size setting now applies when a hint's target element's size is less than 6px

## 1.11

* Link Hints can now be styled according to the target element's font size. This behavior is now the default
* Link hint placement now ignores padding and borders 
* Added settings for specifying the horizontal and vertical translation of link hints. Default is to place link hints directly to the left of the target element
* Firefox specific bug fixes. Firefox releases will henceforth be published together with Chrome releases.

## 1.10

* Fixed bug that cause "Detect Hints Using Cursor Style" setting to be ignored
* Added "Bind to physical keys" options so users can decide whether to bind commands to physical keys or to the characters produce from typing keys
* Updated how keybindings are presented to the users
* Modified many default keybindings. See Options Page or tutorial for the complete details
* Updated documentation with new keybindings
* Rearranged which category each setting is assigned to

## v1.9

* Release notes are now shown on the info page (which appears when Saka Key updates)

## v1.8

* Fixed bug that prevented link hints from detecting selects and textareas
* Updated default mode's goBack and goForward bindings to <kbd>c</kbd><kbd>c</kbd> and <kbd>v</kbd><kbd>v</kbd> respectively
* Improved link hints behavior on video elements and in fullscreen mode

## v1.7

* Add Pass Key commands to make using page shortcuts possible
* Add commands for opening links in background tabs, foreground tabs, new windows, incognito windows and downloading links
* Typing Escape now always exits text inputs
* Fixed a bug that broke scrolling if the user changed the scroll step

## v1.6

* Better scroll element identification; scrolling on gmail now works
* Added Pass Key Commands. You can now use a page's keyboard shortcuts (e.g. on github or gmail) without disabling Saka Key
* Refactored and simplified mode's code
* Updated/added developer documentation

## v1.5

* Replaced About page with more helpful Info page that is opened on install/update
* Updated link hints to work on popup

## v1.4

* Multi-frame link hints
* Regenerate clientSettings on startup so that Saka Key doesn't break when you close then reopen your browser
* change default link hints binding from <kbd>alt+f</kbd> to <kbd>f</kbd><kbd>f</kbd> 