# Basics

## Intro

Saka Key is a browser extension that lets you map keys on your keyboard to common browser tasks. It waits for you to press a key, then executes the appropriate action. This action might be scrolling a page, switching tabs, or clicking a link.

## Commands and Bindings

To use commands, you must first bind them to keys on your keyboard. Default bindings are built-in, but you have complete freedom to add, delete, and modify bindings using the [Options Page](). Commands can be bound to a single key, or a sequence of multiple keys. Commands only execute if a text input is *not* focused so that you can type text as usual.

<!-- TODO: You can unfocus any text input by pressing <kbd>Escape</kbd>. -->

## Resources

The following pages in this tutorial explain how to use Saka Key's commands.

To view all the commands Saka Key provides, visit the complete [Commands List](/commands/index.md). 

<!-- TODO: You can view what key each command is bound to by typing <kbd>?</kbd> or equivalently <kbd>Shift + /</kbd>  from any page. -->

## Limitations

Saka Key works on most pages, but cannot run on the Chrome Store and or Chrome's built-in pages. This is a limitation imposed by Chrome for security reasons.

PDFs are also troublesome. You can use keyboard shortcuts to close PDF tabs and switch to other tabs, but you cannot scroll PDFs.

To work around these limitations, I recommend learning the following Chrome shortcuts.

* <kbd>Ctrl + Tab</kbd> - switches to the next tab
* <kbd>Ctrl + Shift + Tab</kbd> - switches to the previous tab
* <kbd>Ctrl + W</kbd> - closes the current tab.

## Profiles

Most of the time you want to browse the web with both hands, but sometimes you might want to browse with just your left hand. To make this possible, Saka Key lets you define [Settings Profiles]() that are easy to switch between.

The default profile for new users gives *safe* commands, like scrolling and zooming, simple bindings, like <kbd>D</kbd> and <kbd>Z</kbd>. *Unsafe* commands that trigger irreversible changes, like closing a tab or going back in history, have complex bindings, like <kbd>Alt + X</kbd> and <kbd>Alt + C</kbd>. When you become more comfortable with Saka Key, try switching to a profile with *unsafe* commands.

This tutorial assumes you're a new user using the **default** profile. If you are using some other profile, commands may be mapped to different keys.