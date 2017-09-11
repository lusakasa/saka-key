# Setup

## Requirements

To develop Saka Key, you must first install:

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js and npm](https://nodejs.org/en/)
* A text editor. I recommend [VS Code](https://code.visualstudio.com/Download) with the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

## Install

### Install on Chrome

1. Run the following commands in your terminal to clone and build Saka Key. 
  An extension you can run will be generated in the 'dist' directory.

  ```sh
  git clone https://github.com/lusakasa/saka-key.git
  cd saka-key
  npm install
  npm run build:chrome
  # or if you want to generate an optimized production build
  npm run build:chrome:prod
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
  npm run build:firefox
  # or if you want to generate an optimized production build
  npm run build:firefox:prod
  ```

2. Navigate to `about:debugging`

3. Enable add-on debugging and click 'Load Temporary Add-on'

4. Select any file within the dist directory, and &#128640;.

5. Firefox will load Saka Key automatically into all valid existing tabs

## Development Tips

Saka Key is developed together with:

* Mosi - a messaging library for Chrome extensions: [github](https://github.com/eejdoowad/mosi), [npm](https://www.npmjs.com/package/mosi)

You may have to debug or modify Mosi when contributing to saka key. To use your local copy of Mosi when building Saka Key:

1. Navigate to Mosi's root directories.
2. Run `npm link`
3. Navigate to the root of Saka key.
4. Run `npm link mosi`

### Documentation Handbook (key.saka.io)

The Saka Key handbook (which you're reading right now) is generated using [Gitbook](https://github.com/GitbookIO/gitbook). Markdown files in the `book` directory are processed by Gitbook to generate HTML files. Run `npn run book:dev` from Saka Key's root directory to see changes live.

[key.saka.io](https://key.saka.io) is automataically generated from Saka Key's github repository on every commit using [Netlify](https://www.netlify.com/).

## Deployment

[Travis CI](https://travis-ci.org/) generates a [Saka Key Release](https://github.com/lusakasa/saka-key/releases) from every tagged commit. A release includes source code as well as development and production builds for Chrome and Firefox. Create a release with `git tag -a v1.x.x -m "v1.x.x"`. Push tags with `git push origin --tags`.

### Testing

This is unfortunately a todo.