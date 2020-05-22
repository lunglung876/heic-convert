const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: ['./src/index.js', './src/style.scss'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.(scss)$/,
                use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('autoprefixer'),
                                require('precss'),
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
};