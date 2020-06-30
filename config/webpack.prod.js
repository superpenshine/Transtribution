const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production', 
    output: {
        // path: path.join(__dirname, '/dist'), 
        path: path.resolve('./dist'), 
        // filename: '[name].[contentHash].js', // use for standalone frontend
        filename: '[name].js', // django handles md5 hashing
        publicPath: '/static/', 
    }, 
    optimization: {
        // Minimize css and js
        minimizer: [
            new OptimizeCssAssetsPlugin(), 
            new TerserPlugin()
        ]
    }, 
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader, // Extract css into files
                    'css-loader' // css to commonjs
                ], 
            },
        ]
    }, 
    plugins: [
        // Cleanup output folder
        new CleanWebpackPlugin(), 
        // Extract to separate css files
        new MiniCssExtractPlugin({
            // filename: "[name].[contentHash].css", // use for standalone frontend
            filename: "[name].css",  // django handles md5 hashing
        }), 
        // Insert <script> to custom template
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html'), 
            favicon: path.resolve("./public/favicon.ico"), 
            // template: './public/index.html', 
            // favicon: "./public/favicon.ico", 
            removeComments: true, 
            removeAttributeQuates: true, 
            collapseWhitespace: true
        })
    ]
});
