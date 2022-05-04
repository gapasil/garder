const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack')

module.exports = (env, args) => ({
    optimization: {
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                default: {
                    minChunks: 2,
                    reuseExistingChunk: true,
                },
                vendor_react: {
                    test: /.*\/node_modules\/react\/index\.js/,
                    name: 'vendor-react',
                    chunks: 'initial',
                    enforce: true,
                },
            },
        },
    },

    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
        sourceMapFilename: "[name].js.map"
    },
    plugins: [new MiniCssExtractPlugin(),
        new htmlWebpackPlugin(
            {
                template: path.resolve(__dirname, "public", "index.html"),
                favicon: "./public/favicon.ico"
            }
        ),
        new webpack.ProvidePlugin({
            "React": "react",
        }),

        new Dotenv({
            path: args.mode === "development" ? './.env' : './.env.production',
            safe: true,
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: "@svgr/webpack"
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                loader: "file-loader",
                options: {
                    context: 'src/assets/fonts',
                    name: "[path][name].[ext]",
                    outputPath: "fonts"
                }
            }, {
                test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
                loader: "file-loader",
                options: {
                    context: 'src/assets/img',
                    name: "[path][name].[ext]",
                    outputPath: "img"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {minimize: true}
                    }
                ]
            },
        ]
    },
    devtool: "source-map",
    devServer: {
        open: true,
        proxy: {
            '/v2': {
                cookieDomainRewrite: "localhost",
                target: 'https://api.gardershop.kz/',
                changeOrigin: true,
                secure: false,
            },
        },
        port: 3000,
        hot: true,
        historyApiFallback: true, 
    }
})