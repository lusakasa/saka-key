#! /usr/bin/env node
const fs = require('fs')
const path = require('path')
const program = require('commander')
const babel = require('babel-core')
const babelPresetMinify = require('babel-preset-minify')

const version = '0.1.0'
program
  .version(version)
  .usage('[options] <file>')
  .option('-o, --out <out>', 'output file path')
  .parse(process.argv)

const [pluginFile] = program.args
if (pluginFile === undefined) {
  console.error('Error: missing target plugin')
  return 1
}
if (!fs.existsSync(pluginFile)) {
  console.error(`Error: target '${pluginFile}' doesn't exist`)
  return 1
}

const raw = fs.readFileSync(pluginFile, 'utf8')
const optimized = babel.transform(raw, {
  babelrc: false,
  presets: [[babelPresetMinify, {}]],
  comments: false,
  inputSourceMap: null,
  sourceMaps: false,
  minified: true
}).code
const js = eval(optimized)
const json = JSON.stringify(
  js,
  (key, value) => (typeof value === 'function' ? value.toString() : value),
  2
)

// TODO: Validate json forms valid plugin
const outFile =
  program.out ||
  path.format({ name: path.basename(pluginFile, '.js'), ext: '.json' })
fs.writeFileSync(outFile, json)
