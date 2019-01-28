const {resolve} = require('path');
const {promises: {readdir, stat}} = require('fs');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {DefinePlugin} = require('webpack');

/* global __dirname */
const env = process.env.BROWSERSLIST_ENV || 'modern';
const plugins = [
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: 'bluebird-ui.css',
  }),
  new DefinePlugin({
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
  }),
];

const config = {
  output: {
    path: env === 'modern' ? resolve(__dirname, '../dist') : resolve(__dirname, '../dist', 'ie'),
    publicPath: env === 'modern' ? '/' : '/ie/',
    library: 'bluebird-ui',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          {
            use: ['pug-loader'],
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
  plugins,
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
      new OptimizeCSSAssetsPlugin(),
    ],
  },
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

  files = await readdir(`${src}/mixins`, 'utf8');
  entry = files.reduce((result, file) => {
    const [filename] = file.split('.');
    result[`mixins/${filename}`] = `${src}/mixins/${file}`;
    return result;
  }, entry);
  entry.index = `${src}/index.js`;
  entry.helper = `${src}/helper/index.js`;
  entry.bus = `${src}/event-bus.js`;
  config.entry = entry;
  return config;
};
