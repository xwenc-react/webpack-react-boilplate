const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    devtool: 'cheap-eval-source-map',

    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, "dist"),
        port: 3000,
        host: "0.0.0.0",
        publicPath: "/",
        historyApiFallback: true,
        disableHostCheck: true
    },

    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "app.[hash].js"
    },

    optimization: {
        runtimeChunk: {
          name: 'manifest'
        },
        splitChunks: {
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
            }
          }
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

});
