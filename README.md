**Saka Key needs a maintainer. Interested? See https://github.com/lusakasa/saka-key/issues/171**

# Saka Key

Saka Key is a Chrome and Firefox extension for keyboard-only web browsing. It differs from existing extensions because

1. Its state machine [architecture](http://key.saka.io/dev_docs/software_architecture) is modular, extensible, and **SIMPLE**. Its design is inspired by my frustration trying to make sense of the scattered state, confusing event handling, and dubious design of similar extensions.

2. It's not Vim. Aesthetics matter and graphical menus takes preference over text configuration. It's friendly to non-developers. You shouldn't need a tutorial, but there is one.

3. It's engineered for configurability. Developers define options with JSON. This JSON is used to generate the Options Page. Changes to options automatically propagate to all tabs. Options are organized into _profiles_, which are easy to switch between. Sensible default profiles are built-in. Options can be exported and imported.

4. It's built with modern tools: ES6+, Webpack, Preact.

Saka Key lacks some features other extensions have today, but it has the foundation to reinvent and recreate them better than ever. 

Try [Saka](https://saka.io), read the [Saka Key Handbook](https://key.saka.io), and ask questions on [Gitter](https://gitter.im/lusakasa/Lobby).

## Install

* **Chrome** - install from the [Chrome Web Store](https://chrome.google.com/webstore/detail/saka-key/hhhpdkekipnbloiiiiaokibebpdpakdp).
* **Firefox** - install from the [Firefox Marketplace](https://addons.mozilla.org/en-US/firefox/addon/saka-key/)

### Install from Source

Follow the [Development Setup Guide](https://key.saka.io/dev_docs/setup.html) for detailed instructions. Otherwise:

```sh
git clone https://github.com/lusakasa/saka-key.git
cd saka-key
npm install
# Option 1. Chrome development build
npm run build:chrome
# Option 2. Chrome production build
npm run build:chrome:prod
# Option 3. Firefox development build
npm run build:firefox
# Option 4. Firefox production build
npm run build:firefox:prod
```

## Preview

![Saka Key Preview](./book/images/saka-key-preview.gif)

## Credits

MIT Licensed, Copyright (c) 2017 Sufyan Dawoodjee 

Saka Key is inspired by and derives from

* [Vimium](https://github.com/philc/vimium)
* [Vimari](https://github.com/guyht/vimari)
* [cVim](https://github.com/1995eaton/chromium-vim)
* [Surfingkeys](https://github.com/brookhong/Surfingkeys)
* [VimFX](https://github.com/akhodakivskiy/VimFx)
