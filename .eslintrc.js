module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
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
  ],
  rules: {
    'fp/no-arguments': 'error',
    'fp/no-class': 'error',
    'fp/no-delete': 'error',
    'fp/no-events': 'error',
    'fp/no-get-set': 'error',
    'fp/no-let': 'error',
    'fp/no-loops': 'error',
    'fp/no-mutating-assign': 'error',
    'fp/no-mutating-methods': 'error',
    'fp/no-mutation': [ 'error', {
      "commonjs": true,
    }],
    'fp/no-nil': 'error',
    'fp/no-proxy': 'error',
    'fp/no-rest-parameters': 'error',
    'fp/no-this': 'error',
    'fp/no-throw': 'error',
    'fp/no-unused-expression': 'error',
    'fp/no-valueof-field': 'error',
    'no-var': 'error'
  },
};
