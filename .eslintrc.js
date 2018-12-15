module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // https://github.com/prettier/prettier/issues/3847
    'space-before-function-paren': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-spacing': [
      'off',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always'
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
