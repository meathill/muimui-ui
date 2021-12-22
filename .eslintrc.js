module.exports = {
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
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
    '@vue/typescript/recommended',
  ],
  globals: {
    PRODUCTION: false,
    process: false,
    describe: false,
    it: false,
    expect: false,
    __dirname: true,

    withDefaults: true,
    defineProps: true,
    defineEmits: true,
    defineExpose: true,

    Nullable: true,
    FocusHandler: true,

    $root: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 0,
  },
};
