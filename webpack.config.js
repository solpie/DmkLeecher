var webpack = require('webpack');

module.exports = {
    entry: {
        "main": "./src/chrome/main.ts" //electron default entry index.js if no package.json
    },
    output: {
        path: __dirname + '/chrome',
        filename: "[name].js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' },
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.html$/, loader: "html-loader?minimize=false" }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".html", ".js"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};