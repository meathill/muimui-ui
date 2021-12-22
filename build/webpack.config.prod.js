const {promises: {readdir, stat}} = require('fs');
const {resolve} = require('path');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('./webpack.config');

const prodConfig = {
  output: {
    path: resolve(__dirname, '../dist') ,
    publicPath: '/',
    library: 'muimui-ui',
    libraryTarget: 'umd',
  },
  mode: 'production',
  devtool: false,
  externals: [
    {
      'lodash': 'commonjs lodash',
      'eventemitter3': 'commonjs eventemitter3',
      'moment': 'commonjs moment',
      'vue': 'commonjs vue',
    },
    function(context, request, callback) {
      if (/^lodash\//.test(request)) {
        return callback(null, 'commonjs ' + request);
      }
      if (/moment$/.test(request)) {
        return callback(null, 'commonjs moment');
      }
      callback();
    },
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /node_modules/,
        terserOptions: {
          ecma: 9,
          toplevel: true,
          compress: {
            drop_console: true, // eslint-disable-line camelcase
          },
        },
      }),
      new CssMinimizerWebpackPlugin(),
    ],
  },
};

module.exports = async() => {
  const src = resolve(__dirname, '../src');
  let files = await readdir(src, 'utf8');
  files = await Promise.all(files.map(async file => {
    const fileStat = await stat(`${src}/${file}`);
    return fileStat.isFile() ? file : null;
  }));
  let entry = files.reduce((result, file) => {
    if (!file) {
      return result;
    }
    const [filename, ext] = file.split('.');
    if (ext === 'vue') {
      result[filename] = `${src}/${file}`;
    }
    return result;
  }, {});

  entry.index = `${src}/index.js`;
  entry.helper = `${src}/helper/index.js`;
  entry.bus = `${src}/event-bus.js`;

  return {
    ...config,
    ...prodConfig,
    entry,
  };
};
