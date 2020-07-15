const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function devConfig() {
    return {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            inline: true,
            port: 8001
        }
    }
}

function buildConfig() {
    return {
        entry: "./src/main.jsx",
        output: {
            path: path.join(__dirname, '/public'),
            filename: '[name].index.js'
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
        ]
    }
}

module.exports = (env, argv) => {
    if (argv.mode == 'production') {
        config = buildConfig();
    } else {
        devConf = devConfig();
        config = buildConfig();
        config = {
            ...devConf,
            ...config
        }
    }
    return config;
}