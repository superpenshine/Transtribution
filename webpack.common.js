
module.exports = {
    entry: {
        index_bundle: './src/index.js', 
        // vender: "./src/vendor.js" // Multi-entry setting
    }, 
    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader'
                } 
            }, 
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "imgs/", 
                            name: '[name].[hash].[ext]'
                        }
                    }
                ]
            }, 
            // loads imgs to output without import
            {
                test: /\.html$/, 
                use: ["html-loader"]
            }
        ]
    }, 
    resolve: {extensions: ['.js', '.jsx']}, 
}
