const {resolve} = require('path');
const {assign} = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');

/* global __dirname */

const demoConfig = config()
  .then(config => {
    return assign(config, {
      entry: {
        index: resolve(__dirname, '../src/demo/index.js'),
      },
      output: {
        path: resolve(__dirname, '../dist'),
        filename: '[name].js',
      },
      mode: 'development',
      externals: {},
      plugins: config.plugins.concat([
        new HtmlWebpackPlugin({
          template: resolve(__dirname, '../src/demo/template/index.pug'),
        }),
      ]),
      devtool: 'source-map',
    });
  });
module.exports = () => {
  return demoConfig;
};
