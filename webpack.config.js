module.exports = {
  devtool: 'source-map',
  entry: {
    'background_page': './src/background_page.js',
    'content_script': './src/content_script.js',
    'options': './src/options.js'
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
        }
      }
    ]
  }
};
