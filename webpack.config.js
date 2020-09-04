const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    library: 'fp-utils-types',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/, /test/],
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
}
