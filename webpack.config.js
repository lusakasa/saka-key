const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = function (env) {
  var config = {
    entry: {
      'background_page': './src/background_page/index.js',
      'content_script': './src/content_script/index.js',
      'content_script_loader': './src/content_script/loader.js',
      'options': './src/options/index.js',
      'popup': './src/popup/index.js'
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].js'
    },
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
          use: ['style-loader', 'css-loader'],
        }
      ]
    },
    resolve: {
      modules: [
        './src',
        './node_modules'
      ]
    }
  };
  // Enable minification with Babili for production
  // Enable source maps for development
  if (env === 'prod') {
    config.plugins = [
      new BabiliPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'SAKA_DEBUG': JSON.stringify(false)
      })
    ];
  } else {
    config.devtool = 'source-map';
    config.output.sourceMapFilename = '[name].js.map';
    config.plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'SAKA_DEBUG': JSON.stringify(true)
      })
    ];
  }
  return config;
};
