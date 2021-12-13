const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');

const demoConfig = {
  ...config,
  entry: {
    index: resolve(__dirname, '../src/demo/index.ts'),
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  plugins: config.plugins.concat([
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/demo/template/index.pug'),
    }),
  ]),
  devtool: 'source-map',
};
module.exports = () => {
  return demoConfig;
};
