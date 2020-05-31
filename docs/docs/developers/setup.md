---
id: setup
title: Setup
sidebar_label: Setup
---

## Requirements

To develop Saka Key, you must first install:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js and npm](https://nodejs.org/en/)
- A text editor. I recommend [VS Code](https://code.visualstudio.com/Download) with the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

## Install

### Install on Chrome

1. Run the following commands in your terminal to clone and build Saka Key.
   An extension you can run will be generated in the 'dist' directory.

```sh
git clone https://github.com/lusakasa/saka-key.git
cd saka-key
npm install
npm run start:chrome
# or if you want to generate an optimized production build
npm run build:chrome
```

2. Navigate to `chrome://extensions`

3. Enable developer mode and click 'Load Unpacked Extension'

4. Select the dist directory, and &#128640;.

5. Refresh existing tabs to load Saka Key into them

### Install on Firefox

1. Run the following commands in your terminal to clone and build Saka Key.
   An extension you can run will be generated in the 'dist' directory.

```sh
git clone https://github.com/lusakasa/saka-key.git
cd saka-key
npm install
npm run start:firefox
# or if you want to generate an optimized production build
npm run build:firefox
```

2. Navigate to `about:debugging`

3. Enable add-on debugging and click 'Load Temporary Add-on'

4. Select any file within the dist directory, and &#128640;.

5. Firefox will load Saka Key automatically into all valid existing tabs

## Development Tips

Saka Key is developed together with:

- Mosi - a messaging library for Chrome extensions: [github](https://github.com/eejdoowad/mosi), [npm](https://www.npmjs.com/package/mosi)

You may have to debug or modify Mosi when contributing to saka key. To use your local copy of Mosi when building Saka Key:

1. Navigate to Mosi's root directories.
2. Run `npm link`
3. Navigate to the root of Saka key.
4. Run `npm link mosi`

## Deployment

A Github action generates a release from every tagged commit. To generate a new release, run `git tag vx.x.x"`. Then push the tag with`git push origin vx.x.x`.

[key.saka.io](https://key.saka.io) is automataically generated from `/docs` directory of Saka Key's github repository on every commit using [Netlify](https://www.netlify.com/).

### Testing

This is unfortunately a todo.
