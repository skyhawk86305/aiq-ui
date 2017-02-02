var webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  commonConfig = require('./webpack.common.js'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CompressionPlugin = require("compression-webpack-plugin");

module.exports = webpackMerge(commonConfig, {
  output: {
    path: __dirname + '/../build',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor'] }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: { keep_fnames: true } }),
    new CleanWebpackPlugin(['build'], { root: __dirname + '/..' }),
    new CompressionPlugin({ asset:'../build.zip' })
  ]
});