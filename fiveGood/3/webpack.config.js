let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/2.lodash.js',
    output:{
        filename:'bundle.js'
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    }
}