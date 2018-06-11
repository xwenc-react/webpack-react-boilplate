const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'assets');

const appHtmlTitle = 'Webpack Boilerplate';

const vendor = ['react','react-dom','react-router'];

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        vendor,
        app: path.join(dirApp, 'main')
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            title: appHtmlTitle,
            chunksSortMode: 'none' //ttps://github.com/jantimon/html-webpack-plugin/issues/870
        })
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // STYLES
            {
                test: /\.s?[ac]ss$/,
                use: [
                    IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            // IMAGES
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
                  {
                    loader: "image-webpack-loader",
                    options: {
                      optipng: {
                        optimizationLevel: 7
                      },
                      gifsicle: {
                        interlaced: false
                      },
                      pngquant: {
                        quality: '65-90',
                        speed: 4,
                      },
                      mozjpeg: {
                        quality: 65,
                        progressive: true
                      }
                    }
                  }
                ]
            },
            // {
            //     test: /\.(png|svg|jpg|gif|eot|ttf|woff|woff2)$/,
            //     use: {
            //       loader: "url-loader",
            //       options: {
            //         limit: 2048000,
            //         name: "name=[hash:8].[name].[ext]"
            //       }
            //     }
            // },

            // FONTS
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader"
            }
        ]
    }
};
