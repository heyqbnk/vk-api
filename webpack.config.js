/* eslint-disable */
const {HotModuleReplacementPlugin} = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './test-drive/browser/index.js',
  context: __dirname,
  devServer: {
    contentBase: path.join(__dirname, 'test-drive', 'browser'),
    compress: true,
    watchContentBase: true,
    hot: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
              ],
              sourceType: 'unambiguous'
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ]
          }
        },
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin({}),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    pathinfo: false,
    path: path.resolve(__dirname, 'test-drive', 'browser'),
  },
};
