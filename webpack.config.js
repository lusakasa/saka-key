const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// process.traceDeprecation = true;

module.exports = function (env) {
  var config = {
    entry: {
      'background_page': './src/background_page/index.js',
      'content_script': './src/content_script/index.js',
      'content_script_loader': './src/content_script/loader.js',
      'help': './src/help/index.js',
      'options': './src/options/index.js'
    },
    output: {
      path: __dirname + '/dist',
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
        }
      ]
    },
    resolve: {
      modules: [
        './src',
        './node_modules'
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'static'
        },
        {
          context: 'src/modes',
          from: '**/default.json',
          to: 'default_[folder].json'
        },
        {
          context: 'src/modes',
          from: '**/config.json',
          to: 'config_[folder].json'
        }
      ])
    ]
  };

  const [mode, platform] = env.split(':');
  const version = require('./static/manifest.json').version;
  // mode controls:
  // 1. SAKA_DEBUG: boolean(true | false)
  //   * true for development builds
  //   * false for production build
  //   If you want something to run only in testing/development, use
  //     if (SAKA_DEBUG) { console.log(variable); }.
  //   All code within will be removed at build time in production builds.
  // platform controls:
  // 1. SAKA_PLATFORM: string('chrome' | 'firefox' | 'edge')
  //   Use this to provide platform specific features, e.g. use shadow DOM
  //   on chrome but css selectors on firefox and edge for link hint styling

  if (mode === 'prod') {
    config.plugins = config.plugins.concat([
      new BabiliPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'SAKA_DEBUG': JSON.stringify(false),
        'SAKA_VERSION': JSON.stringify(version),
        'SAKA_PLATFORM': JSON.stringify(platform)
      })
    ]);
  } else {
    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'SAKA_DEBUG': JSON.stringify(true),
        'SAKA_VERSION': JSON.stringify(version + ' dev'),
        'SAKA_PLATFORM': JSON.stringify(platform)
      })
    ]);
  }
  return config;
};
