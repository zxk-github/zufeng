const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[hash].js'
  },
  devServer: {
    port: 2000,
    contentBase: path.join(__dirname, './dist'),
  }
}