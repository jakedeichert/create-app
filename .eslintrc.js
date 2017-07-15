const OFF = 'off';

module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: './packages/eslint-config-create-app/index.js',

  rules: {
    'no-console': OFF,
  },
};
