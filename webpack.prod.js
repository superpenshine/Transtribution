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
        path: path.join(__dirname, '/dist'), 
        filename: '[name].[contentHash].js', 
        // to use publicPath, all react router dom <route> path need fix
        // or use: 
        // <Route path={`${process.env.PUBLIC_URL}/`} component={Home} />
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
            filename: "[name].[contentHash].css", 
        }), 
        // Insert <script> to custom template
        new HtmlWebpackPlugin({
            template: './public/index.html', 
            favicon: "./public/favicon.ico", 
            removeComments: true, 
            removeAttributeQuates: true, 
            collapseWhitespace: true
        })
    ]
});
