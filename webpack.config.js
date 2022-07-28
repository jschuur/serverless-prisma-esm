/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const { isLocal } = slsw.lib.webpack;

module.exports = {
  target: 'node',
  stats: 'normal',
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  mode: isLocal ? 'development' : 'production',
  optimization: { concatenateModules: false },
  resolve: { extensions: ['.js'] },
  module: {
    rules: [
      {
        test: /\.js$/,
        // include: [path.resolve(__dirname, 'src'), /node_modules\/(pretty-ms)/],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.resolve(__dirname, '.webpack'),
  },
};
