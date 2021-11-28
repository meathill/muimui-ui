// Copyright (C) 2017 by OpenResty Inc. All rights reserved.

module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 'esnext',
  },
  plugins: [
    'babel',
    'vue',
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  globals: {
    PRODUCTION: false,
    process: false,
    describe: false,
    it: false,
    expect: false,
  },
};
