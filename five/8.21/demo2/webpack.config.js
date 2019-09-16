const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, './src/index.js'),
    login: path.join(__dirname, './src/index.js')
  },
  output: {
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    port: 2000,
    contentBase: path.join(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // 产出html文件,编译的时候会读取模版文件，然后把产生的bundle链接添加到html中
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html', //产出的文件名
      hash: true,// 为了避免缓存，可以在产出的资源后面添加hash值
      chunks: [],  // 当是多入口的时候，如果不指定chunk，会把所有的打包之后的文件都插入到html中,多个文件的chunk的顺序按照数组元素的顺序
      chunksSortMode: 'manual' // 对引入代码块引入顺序排序，配合chunks使用
    })
  ]
} 