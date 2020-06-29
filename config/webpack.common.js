const path = require('path');

module.exports = {
    entry: {
        index_bundle: path.resolve('./src/index.js'), 
        // index_bundle: './src/index.js', 
        // vender: "./src/vendor.js" // Multi-entry setting
    }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/, 
                exclude: /node_modules\/(?!(react-native-vector-icons)\/).*/, 
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
            }, 
            // For vector icons
            {
                test: /\.ttf$/,
                loader: "file-loader", // or url-loader
                options: {
                    name: './fonts/[name].[ext]'
                }
            },
        ]
    }, 
    resolve: {extensions: ['.js', '.jsx']}, 
}
