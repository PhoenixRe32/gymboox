const OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    'es6': true,
  },
  plugins: [
    'import'
  ],
  extends: [
    'airbnb-base',
  ],
  rules: {
    'global-require': OFF,
    'no-unused-expressions': [WARN, {
      'allowShortCircuit': true,
      'allowTernary': true
    }],
    'no-use-before-define': [WARN, { functions: false, classes: true, variables: true }],
    'import/no-dynamic-require': OFF,
    'import/no-extraneous-dependencies': OFF,
    'import/prefer-default-export': OFF,
    'func-names': OFF,
  },
};