module.exports = {
  devtool: 'source-map',
  entry: {
    'background_page': './src/background_page.js',
    'content_script': './src/content_script.js'
  },
  output: {
    path:  __dirname + '/dist',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  }
};
