# Saka Key

A keyboard interface to the web.

Install from the [Chrome Web Store](https://chrome.google.com/webstore/detail/saka-key/hhhpdkekipnbloiiiiaokibebpdpakdp) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/saka-key/).

## Index

* [Intro](#intro)
* [Install](#install)
* [Development Tips](#development-tips)
* [Credits](#credits)

## Intro

Saka Key lets you navigate the web with just your keyboard. It differs from existing vi-inspired chrome extensions on four fronts:

1. Its [architecture](./doc/developer_guide.md) is modular, extensible, and _hopefully_ easy to understand. It is designed to be as easy as possible to add complex features with minimal effort and understanding of the codebase. 

2. It's not vim. Aesthetics matter and graphical menus takes preference over text configuration. It's friendly to non-developers.   

3. It's engineered for configurability. There are no hardcoded keybindings you have to unmap. There is no default hint styling. Default _settings profiles_ are built-in, but the user can make any changes desired. Per-domain profiles coming soon.

4. It's built with modern web tooling (as of 2017): ES6+, Webpack, Preact... no Coffeescript to be seen. These tools weren't selected just because they're hip and new. Saka Key would be something entirely different without native asynchronous support, ES6 Modules, and functional UI libraries.

Note: This is a developing project that has bugs and lacks features. If you're looking for a robust experience, try some of the more mature options like [Vimium](https://github.com/philc/vimium) and [cVim](https://github.com/1995eaton/chromium-vim).

## Install

Run the following commands in your terminal to clone and build Saka Key

```
git clone https://github.com/lusakasa/saka-key.git
cd saka-key
npm install
npm run build
```

An extension you can run will be generated in the 'dist' directory.

Open Chrome and navigate to chrome://extensions

Enable developer mode and select 'Load unpacked Extension'

Select the dist directory, and &#128640;.

## Development Tips

Save yourself some trouble and read the [Developer Guide](./doc/developer_guide.md). It explains the basics of how Saka Key works.

Check out the [doc](./doc) folder to learn about Saka Key's design.

Saka Key is developed with and reliant on the following libraries:
* saka-actions: [github](https://github.com/lusakasa/saka-actions), [npm](https://www.npmjs.com/package/saka-actions)
* mosi: [github](https://github.com/eejdoowad/mosi), [npm](https://www.npmjs.com/package/mosi)

You may have to debug or modify these libraries when contributing to saka key. To use your local copy of these libraries when building saka-key:

1. Navigate to their root directories.
2. Run `npm link`
3. Navigate to the root of Saka key.
4. Run `npm link saka-actions` and/or `npm link mosi`

## Credits

MIT Licensed, Copyright (c) 2017 Sufyan Dawoodjee 

Saka Key is inspired by and derives from

* [Vimium](https://github.com/philc/vimium)
* [Vimari](https://github.com/guyht/vimari)
* [cVim](https://github.com/1995eaton/chromium-vim)
* [Surfingkeys](https://github.com/brookhong/Surfingkeys)
* [VimFX](https://github.com/akhodakivskiy/VimFx)