// eslint-disable-next-line no-undef
module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['react', '@typescript-eslint', 'unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': ['warn'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'react/jsx-tag-spacing': 'warn',
    // camelcase: 'error',
    'no-multi-spaces': ['error'],
    'no-unneeded-ternary': ['error'],
    /*    'object-curly-newline': ['error', { consistent: true }], */
    'no-console': 'warn',
    'no-trailing-spaces': ['error'],
    quotes: ['error', 'single'],
    'jsx-quotes': ['warn', 'prefer-double']
  }
}
