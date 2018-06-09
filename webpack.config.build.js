const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    devtool: 'source-map',

    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "assets/[name].[hash].js",
        chunkFilename: "assets/[name].[chunkhash].js"
    },

    optimization: {
        runtimeChunk: {
          name: 'manifest'
        },
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // set to true if you want JS source maps,
            uglifyOptions: {
              warnings: false
            }
          }),
          new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks:{
          chunks: 'async',
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          name: false,
          cacheGroups: {
            vendor: {
              name: 'vendor',
              chunks: 'initial',
              priority: -10,
              reuseExistingChunk: false,
              test: /node_modules\/(.*)\.js/
            },
            styles: {
              name: 'styles',
              test: /\.(scss|css)$/,
              chunks: 'all',
              minChunks: 1,
              reuseExistingChunk: true,
              enforce: true
            }
          }
        }
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'assets/app.[name].css',
            chunkFilename: 'assets/app.[contenthash:12].css'
        }),
    ]

});
