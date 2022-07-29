const path = require('path');

const babelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

const { isLocal } = slsw.lib.webpack;

const pureESMModules = ['pretty-ms', 'parse-ms'];

module.exports = {
  target: 'node',
  stats: 'normal',
  entry: slsw.lib.entries,
  externals: [
    nodeExternals({
      allowlist: pureESMModules,
    }),
  ],
  mode: isLocal ? 'development' : 'production',
  optimization: { concatenateModules: false },
  resolve: { extensions: ['.js'] },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: babelLoaderExcludeNodeModulesExcept(pureESMModules),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.resolve(__dirname, '.webpack'),
  },
};
