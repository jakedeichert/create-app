const OFF = 'off';

module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: '@jakedeichert/eslint-config-create-app/base.js',

  rules: {
    'no-console': OFF,
  },
};
