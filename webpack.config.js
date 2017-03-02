module.exports = {
  devtool: 'source-map',
  entry: {
    'background_page': './src/background_page/index.js',
    'content_script': './src/content_script/index.js',
    'content_script_loader': './src/content_script/loader.js',
    'options': './src/options/index.js',
    'popup': './src/popup/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
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
  }
};
