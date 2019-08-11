const path = require('path')
const Webpack = require('webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const RewriteImportPlugin = require('less-plugin-rewrite-import')

const CONFIG = require('./src/config')

const MODE = JSON.stringify(process.env.NODE_ENV || 'development')

module.exports = {
    target: 'web',

    mode: MODE === '"development"' ? 'development' : 'production',

    context: __dirname,

    devtool: MODE === '"development"' ? 'cheap-module-source-map' : 'source-map',

    entry: './src/index.jsx',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name]-[hash].js',
        sourceMapFilename: 'js/[name]-[hash].js.map',
        crossOriginLoading: 'anonymous'
    },

    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 3000,
        inline: true,
        stats: ['minimal', 'color'],
        allowedHosts: JSON.parse(process.env.ALLOWED_HOSTS || '["localhost"]'),
        headers: { 'Access-Control-Allow-Origin': '*' }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/env', '@babel/react'],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-export-default-from',
                                '@babel/plugin-proposal-export-namespace-from'
                            ]
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: true
                        }
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: MODE === '"development"',
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            paths: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
                            plugins: [
                                new RewriteImportPlugin({
                                    paths: {
                                        '../../theme.config': path.resolve(
                                            path.resolve(__dirname, 'src', 'style', 'semantic', 'theme.config')
                                        )
                                    }
                                })
                            ],
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(jpg|jpeg|png|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        modules: ['node_modules', './src'],
        extensions: ['.js', '.jsx']
    },

    optimization: {
        minimize: MODE !== '"development"'
    },

    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': MODE
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('.', 'src', 'index.html'),
            title: CONFIG.site_title
        }),
        new FaviconsWebpackPlugin({
            logo: path.resolve('.', 'src', 'images', 'logo-small-wpat.jpg'),
            prefix: 'icons/',
            emitStats: false,
            inject: true
        }),
        new MiniCssExtractPlugin({ filename: 'css/[name]-[hash].css' })
    ].concat(
        MODE === '"development"' ?
            [
                new Webpack.NamedModulesPlugin(),
                new Visualizer()
            ] :
            []
    )
}
