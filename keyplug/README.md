# keyplug

keyplug is a CLI for packaging Saka Key plugins for distribution. It takes a javascript file containing a Saka Key plugin and transforms it into a JSON file that Saka Key understands. It also optimizes javascript functions by running them through Babel Minify before stringifying them.

## Install

npm install -g keyplug

## Usage

```bash
ls
# plugin.js
keyplug plugin.js
ls
# plugin.js   plugin.json
```