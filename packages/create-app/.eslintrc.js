const OFF = 'off';

module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: '@jakedeichert/create-app-eslint-config/base',

  rules: {
    'no-console': OFF,
  },
};
