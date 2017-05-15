# Clicking and Link Hints

** This tutorial uses the default profile's keybindings.**

Browsing the web normally involves moving your mouse to select something, then clicking to activate it. Saka Key lets you use your keyboard to quickly identify and click things on screen. You can use this feature to follow links, focus text inputs, toggle checkboxes, and more.

To get started, type <kbd>Alt + F</kbd>. *Link Hints* will appear next to all clickable elments on screen.

![link hints on screen](/images/link_hints.png)

Each link hint contains a unique sequence of letters. Type the letters of a link hint to activate it. As you type, link hints will be filtered out until only one is left. For example typing <kbd>S</kbd> filters out all link hints that don't start with <kbd>S</kbd>.

![only link hints beginning with S on screen](/images/link_hints_filtered.png)

If you typed <kbd>D</kbd> in the image above, you would follow the link named *Javascript Commands*.

To abort link activation, press <kbd>Escape</kbd> or <kbd>F</kbd> or any key that doesn't appear in any link hint.

## Options

### Appearance

The [Option Page](settings.md) gives you fine control over the appearance of link hints. Using the menu, you can control their size, color, font, position and more. You also have the option to use CSS to control how hints look. 

### Hint Characters

You can configure which characters appear in link hints using the *Hint Characters* setting.

### Finding Clickable Elements

Finding which elements can be clicked is slow. To keep things speedy, you can disable checks that give more accurate link hints at the cost of performance.

* **Detect Hints Using Cursor Style** - finds clickable elements by checking to see if hovering over the element makes the mouse cursor a pointer hand