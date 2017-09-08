# Release Notes

# 1.22.1

* New command **Hard Refresh Tab** <kbd>shift-r</kbd><kbd>shift-r</kbd>

## 1.22.0

* Stopped opening info page on every update, so you probably won't read this!
* Fixed Pass keys mode so that it is no longer broken on Windows and Linux
* New binding **Stop Passing Keys to Page** <kbd>ctrl-x</kbd>
* Fixed bug that caused inputs to become unfocusable when "Prevent pages from stealing focus" is enabled.
* Exporting options now works in Firefox
* Renaming profiles with <kbd>Enter</kbd> now works in Firefox
* Fixed typos in options page

## 1.21.0

* Fixed bug that cause Saka Key to stop responding to key presses.
* If problems persists, try clicking "Reset All Options" on the Options page. If this doesn't help, file an [issue](https://github.com/lusakasa/saka-key/issues).

## 1.20.0

* Fixed vulnerability that allowed any web page to trigger Saka Key commands by issuing synthetic DOM events.
* On Chrome, Saka Key now loads into every page automatically on install and on restart, without requiring page refreshes.
* Silenced unhelpful console log messages
* Fixed Firefox [bug](https://github.com/lusakasa/saka-key/issues/26) that breaks Saka Key on certain pages

## 1.19.0

* Firefox bug fix: opening links in foreground/background/new window now works
* Chrome bug fix: After this release, updating/reloading Saka Key will not break commands in existing tabs 

## 1.18

* Integration with [Saka](https://saka.io) - an elegant Omnibar replacement extension
* Headers are back in the Options page
* New command **Toggle Saka** <kbd>l</kbd> (requires installing [Saka](https://saka.io))

## 1.17

* Emergency bug-fix release. The upgrade path to v1.16 wasn't tested and broke the extension (unless the user manually reset all settings).

## 1.16

* Custom profiles will now be preserved when Saka Key updates
* User's who want automatic updates should stick to built-in profiles
* Modifying a built-in profile creates and switches to a duplicate of the built-in profile
* Creating a New profile now creates a profile with default settings (and no keybindings)
* Many bug fixes on the options page
* You can now import, export, and reset your settings
* Input handling has been updated to make it harder to accidentally issue a command
* Modified binding **Open Link in Background Tab** <kbd>f</kbd><kbd>b</kbd>
* Modified binding **Open Link in Foreground** <kbd>f</kbd><kbd>shift-f</kbd>.
* Additional binding **Next Tab** <kbd>]</kbd>
* Additional binding **Previous Tab** <kbd>[</kbd>
* Additional binding **Move Tab Left** <kbd>shift-[</kbd>
* Additional binding **Move Tab Right** <kbd>shift-]</kbd>
* Additional binding **Move Tab First** <kbd>alt-[</kbd>
* Additional binding **Move Tab Last** <kbd>alt-]</kbd>.
* New command **Activate Clipboard in Current Tab** <kbd>y</kbd><kbd>f</kbd>
* New command **Activate Clipboard in Background Tab** <kbd>y</kbd><kbd>b</kbd>
* New command **Activate Clipboard in Foreground Tab** <kbd>y</kbd><kbd>shift-f</kbd>
* New command **Activate Clipboard in New Window** <kbd>y</kbd><kbd>n</kbd>
* New command **Activate Clipboard in Incognito Window** <kbd>y</kbd><kbd>shift-n</kbd>.

## 1.15

* Fixed bug that caused Saka Key to break when the extension was disabled then reenabled
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
* change default link hints binding from <kbd>alt-f</kbd> to <kbd>f</kbd><kbd>f</kbd> 