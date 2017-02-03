var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['./client/app.ts'],
    vendor: ['./client/vendor.ts'],
    polyfills: ['./client/polyfills.ts']
  },
  module: {
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint' }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'ts' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css?-url' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.(png|jpe?g|gif|ico|svg|woff|woff2|ttf|eot)([\?]?.*)$/, loader: 'file?name=images/[name].[ext]' }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({ template: './client/index.html' }),
    new webpack.ProvidePlugin({ d3: 'd3' }) // ToDo: remove once sf-components is packaged correctly
  ]
};