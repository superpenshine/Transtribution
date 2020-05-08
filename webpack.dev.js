const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development', 
    // devtool: 'none', // not using eval
    output: {
        path: path.join(__dirname, '/dist'), 
        filename: '[name].index_bundle.js', 
    }, 
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'], 
            },
        ]
    }, 
    devtool: 'inline-source-map', 
    devServer: {
        liveReload: false, // HMR enabled, disable live reload
        proxy: {
          '/api': {
                target: 'http://localhost:8000' // Redirect to localhost:8000 for django rest api
            }
        }
    }, 
    plugins: [
        // Insert <script> with js files
        new HtmlWebpackPlugin({
            template: './public/index.html', 
            favicon: "./public/favicon.ico"
        })
    ]
});
