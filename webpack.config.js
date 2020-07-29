var webpack = require('webpack')
var debug = process.env.NODE_ENV !== "production";


module.exports = function(env) {
    return {
        entry: "./site/assets/js/app.js",
        output: {
            path: __dirname + "/site/dist",
            filename: "bundle.js"
        },
         plugins: debug ? [] : [
            new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        ],
        module: {
            loaders: [
                {test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/},
                {test: /\.css$/, loader: "style-loader!css-loader", exclude: /node_modules/},
                {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader", exclude: /node_modules/},
                {test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader'}
            ]
        },
    }
}
