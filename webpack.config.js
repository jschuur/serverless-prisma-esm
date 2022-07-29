const path = require('path');

const babelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

const { isLocal } = slsw.lib.webpack;

module.exports = {
  target: 'node',
  stats: 'normal',
  entry: slsw.lib.entries,
  externals: [nodeExternals({ allowlist: ['pretty-ms', 'parse-ms'] })],
  mode: isLocal ? 'development' : 'production',
  optimization: { concatenateModules: false },
  resolve: { extensions: ['.js'] },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: babelLoaderExcludeNodeModulesExcept(['pretty-ms', 'parse-ms']),
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
