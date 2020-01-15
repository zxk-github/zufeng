let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/4.extends.js',
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