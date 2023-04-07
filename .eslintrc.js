// eslint-disable-next-line no-undef
module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['react', '@typescript-eslint', 'unused-imports', 'simple-import-sort'],
  rules: {
    'unused-imports/no-unused-imports': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'react/jsx-tag-spacing': 'warn',
    // camelcase: 'error',
    'no-multi-spaces': ['error'],
    'no-unneeded-ternary': ['error'],
    /*    'object-curly-newline': ['error', { consistent: true }], */
    'no-console': 2,
    'no-trailing-spaces': ['error'],
    quotes: ['error', 'single'],
    'simple-import-sort/exports': 'error',
    'jsx-quotes': ['warn', 'prefer-double']
  }
}
