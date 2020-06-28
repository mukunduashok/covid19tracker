const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const fileLoader = require("file-loader");

module.exports = {
    entry: "./src/main.jsx",
    mode: "development",
    // devtool: "inline-source-map",
    output: {
        path: path.join(__dirname, '/public'),
        filename: '[name].index.js'
    },
    devServer: {
        inline: true,
        port: 8001
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './assets/covid19.png',
        }),
        // new WebpackBundleAnalyzer(),
    ]
}