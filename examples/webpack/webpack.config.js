var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: 'bundle',
    filename: 'bundle.js',
  },
  devtool: 'cheap-eval-source-map',
  resolve: {
    fallback: path.join(__dirname, 'node_modules'),
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: 'babel-loader!reactdown/webpack',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  }
};
