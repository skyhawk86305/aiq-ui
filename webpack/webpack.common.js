var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');
  CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: ['./client/app/app.module.ts'],
    vendor: ['./client/vendor.ts']
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.less', '.html']
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
    new CopyWebpackPlugin([{ from: './client/static' }]),
    new CopyWebpackPlugin([{ from: './node_modules/@sf-netapp/sf-components/dist/images', to: './images'}]),
    new webpack.ProvidePlugin({ d3: 'd3' }) // ToDo: remove once sf-components is packaged correctly
  ]
};
