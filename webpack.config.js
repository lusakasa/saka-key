const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')

// process.traceDeprecation = true;

// markdown convert to html
const marked = require('marked')
const renderer = new marked.Renderer()

module.exports = function (env) {
  console.log('produce: ' + env)
  const [mode, platform, benchmark, firefoxBeta] = env.split(':')
  let version = require('./manifest/common.json').version
  if (firefoxBeta) version += 'beta'
  const distribution = env.replace(/:/g, '-') // : is is a violation path on Windows
  const outpath = path.join(__dirname, 'dist', distribution)

  const config = {
    entry: {
      background_page: './src/background_page/index.js',
      content_script: './src/content_script/index.js',
      content_script_loader: './src/content_script/loader.js',
      // 'help': './src/help/index.js',
      extensions: './src/pages/extensions/index.js',
      info: './src/pages/info/index.js',
      options: './src/pages/options/index.js'
      // 'popup': './src/popup/index.js',
    },
    output: {
      path: outpath,
      filename: '[name].js',
      sourceMapFilename: '[name].js.map' // always generate source maps
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            // require.resolve needed to work with linked modules
            // (e.g. saka-action in development) or build will fail
            // presets: [require.resolve('babel-preset-stage-3')]
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader'
            },
            {
              loader: 'markdown-loader',
              options: {
                renderer
              }
            }
          ]
        }
      ]
    },
    resolve: {
      modules: ['./src', './node_modules']
    },
    plugins: [
      new CleanWebpackPlugin([outpath], {
        verbose: true
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CopyWebpackPlugin([
        {
          from: 'static'
        },
        {
          context: 'src/options',
          from: '**/default.json',
          to: 'default_[folder].json'
        },
        {
          context: 'src/options',
          from: '**/config.json',
          to: 'config_[folder].json'
        }
      ]),
      new GenerateJsonPlugin(
        'manifest.json',
        merge(
          require('./manifest/common.json'),
          require(`./manifest/${platform}.json`),
          { version }
        ),
        null,
        2
      )
    ]
  }

  // extension id must be specified in calls to chrome.runtime.connect
  // otherwise clients won't be able to reconnect to background page
  // and background commands will stop working
  const EXTENSION_ID = JSON.stringify(
    platform === 'chrome'
      ? 'hhhpdkekipnbloiiiiaokibebpdpakdp'
      : 'a0dd2b80-9ba1-224b-b5fe-3ae14f12d85d'
  )

  if (mode === 'prod') {
    config.plugins = config.plugins.concat([
      new MinifyPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        SAKA_DEBUG: JSON.stringify(false),
        SAKA_VERSION: JSON.stringify(version),
        SAKA_BENCHMARK: JSON.stringify(true),
        SAKA_PLATFORM: JSON.stringify(platform),
        EXTENSION_ID
      })
    ])
  } else {
    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        SAKA_DEBUG: JSON.stringify(true),
        SAKA_VERSION: JSON.stringify(version + ' dev'),
        SAKA_BENCHMARK: JSON.stringify(benchmark === 'benchmark'),
        SAKA_PLATFORM: JSON.stringify(platform),
        EXTENSION_ID
      })
    ])
  }
  return config
}
