# Saka Key

A keyboard interface to the web. Twin to [Saka](https://github.com/lusakasa/saka) - a voice interface to the web.

Install from the [Chrome Web Store](https://chrome.google.com/webstore/detail/saka-key/hhhpdkekipnbloiiiiaokibebpdpakdp).

## Intro

Saka Key lets you navigate the web with just your keyboard. It differs from existing vi-inspired chrome extensions on three fronts:

1. Its primary focus is ease of use. It's not targeted to developers. Aesthetics matter and graphical menus takes preference over text configuration.

2. Its code is clean and organized to make it easy to understand and contribute to. It's engineered, not hacked together. 

3. Its design is extensible. You can add any features you want. Although modes are built-in for performance, they can all be implemented as external extensions. ** architected, but not yet implemented

## Development

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

### Development Notes

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
* [cVim](https://github.com/1995eaton/chromium-vim)
* [Surfingkeys](https://github.com/brookhong/Surfingkeys)