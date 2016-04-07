module.exports = {
  entry: './index.js',
  output: {
    path: 'bundle',
    filename: 'bundle.js',
  },
  devtool: 'cheap-eval-source-map',
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
