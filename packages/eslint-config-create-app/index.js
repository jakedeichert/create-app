const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

module.exports = {
  parser: 'babel-eslint',

  env: {
    es6: true,
  },

  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },

  extends: 'eslint:recommended',

  // Override eslint recommended defaults
  rules: {
    // Enforces return statements in callbacks of array’s methods http://eslint.org/docs/rules/array-callback-return
    'array-callback-return': WARN,
    // Require dot notation http://eslint.org/docs/rules/dot-notation
    'dot-notation': WARN,
    // Require the use of === and !== http://eslint.org/docs/rules/eqeqeq
    eqeqeq: WARN,
    // Disallow await inside of loops http://eslint.org/docs/rules/no-await-in-loop
    'no-await-in-loop': ERROR,
    // Disallow the use of console http://eslint.org/docs/rules/no-console
    'no-console': WARN,
    // Disallow return before else http://eslint.org/docs/rules/no-else-return
    'no-else-return': WARN,
    // Disallow the use of eval http://eslint.org/docs/rules/no-eval
    'no-eval': ERROR,
    // Disallow unnecessary parentheses http://eslint.org/docs/rules/no-extra-parens
    'no-extra-parens': OFF,
    // Disallow implied eval http://eslint.org/docs/rules/no-implied-eval
    'no-implied-eval': ERROR,
    // Disallow primitive wrapper instances http://eslint.org/docs/rules/no-new-wrappers
    'no-new-wrappers': WARN,
    // Disallow reassignment of parameters http://eslint.org/docs/rules/no-param-reassign
    'no-param-reassign': WARN,
    // Disallows unnecessary return await http://eslint.org/docs/rules/no-return-await
    'no-return-await': WARN,
    // Disallow script urls http://eslint.org/docs/rules/no-script-url
    'no-script-url': WARN,
    // Disallow self compare http://eslint.org/docs/rules/no-self-compare
    'no-self-compare': WARN,
    // Disallow unnecessary concatenation of strings http://eslint.org/docs/rules/no-useless-concat
    'no-useless-concat': WARN,
    // Disallow unnecessary escape usage http://eslint.org/docs/rules/no-useless-escape
    'no-useless-escape': WARN,
    // Disallow redundant returns http://eslint.org/docs/rules/no-useless-return
    'no-useless-return': WARN,
    // Require let or const instead of var http://eslint.org/docs/rules/no-var
    'no-var': ERROR,
    // Suggest using const http://eslint.org/docs/rules/prefer-const
    'prefer-const': WARN,
    // Require radix parameter only when needed http://eslint.org/docs/rules/radix
    radix: [WARN, 'as-needed'],
    // Suggest using template literals instead of string concatenation http://eslint.org/docs/rules/prefer-template
    'prefer-template': WARN,
    // Prefer destructuring from arrays and objects http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [WARN, { array: false, object: true }],
    // Suggest using the rest parameters instead of arguments http://eslint.org/docs/rules/prefer-rest-params
    'prefer-rest-params': WARN,
  },
};
