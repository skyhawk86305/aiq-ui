var webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  commonConfig = require('./webpack.common.js');

commonConfig.entry = {}; // Because files are already loaded via karma

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',
  module: {
    postLoaders: [
      {
        test: /\.ts$/,
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          'node_modules',
          'vendor.ts',
          /\.spec\.ts$/
        ]
      }
    ]
  },
  stats: {
    errorDetails: true
  }
});