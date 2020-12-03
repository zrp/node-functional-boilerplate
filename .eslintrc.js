module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    'fp',
    'jest',
    'disable',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: '.',
      },
    },
  },
  rules: {
    'no-var': 'error',

    // jest-rules
    'jest/consistent-test-it': ['error', {
      fn: 'test',
    }],
    'jest/no-conditional-expect': 2,
    'jest/no-deprecated-functions': 2,
    'jest/prefer-strict-equal': 2,
    'jest/require-to-throw-message': 2,
    'jest/valid-title': 2,
    'jest/no-done-callback': 0,

    // fp-rules
    'fp/no-arguments': 'error',
    'fp/no-class': 'error',
    'fp/no-delete': 'error',
    'fp/no-events': 'error',
    'fp/no-get-set': 'error',
    'fp/no-let': 'error',
    'fp/no-loops': 'error',
    'fp/no-mutating-assign': 'error',
    'fp/no-mutating-methods': 'error',
    'fp/no-mutation': ['error', {
      commonjs: true,
    }],
    'fp/no-nil': 'error',
    'fp/no-proxy': 'error',
    'fp/no-rest-parameters': 'error',
    'fp/no-this': 'error',
    'fp/no-throw': 'error',
    'fp/no-unused-expression': 'error',
    'fp/no-valueof-field': 'error',
  },
  processor: 'disable/disable',
  overrides: [{
    files: ['specs/**/*'],
    settings: {
      'disable/plugins': ['fp'],
    },
  }],
};
