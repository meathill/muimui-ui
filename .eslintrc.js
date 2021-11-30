// Copyright (C) 2017 by OpenResty Inc. All rights reserved.

module.exports = {
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: [
    'babel',
    'vue',
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  globals: {
    PRODUCTION: false,
    process: false,
    describe: false,
    it: false,
    expect: false,
    __dirname: true,
  },
};
