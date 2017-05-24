var webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  commonConfig = require('./webpack.common.js');

commonConfig.entry.app.push('webpack-hot-middleware/client?reload=true');
commonConfig.entry.vendor.push('webpack-hot-middleware/client?reload=true');

module.exports = webpackMerge(commonConfig, {
  devtool: 'eval',
  output: {
    path: __dirname + '/build-dev', //No files actually generated
    filename: '[name]-[hash].js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor'] }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
