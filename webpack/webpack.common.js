var webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['./app/index.ts'],
    vendor: ['./app/vendor.ts']
  },
  module: {
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint' }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'ts' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?-url') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },
      { test: /\.(png|jpe?g|gif|ico|svg|woff|woff2|ttf|eot)([\?]?.*)$/, loader: 'file?name=images/[name].[ext]' }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({ template: './app/index.html' }),
    new webpack.ProvidePlugin({ d3: 'd3' }) // ToDo: remove once sf-components is packaged correctly
  ]
};