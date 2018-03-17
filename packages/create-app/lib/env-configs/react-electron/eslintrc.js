module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  extends: [
    '../../../packages/eslint-config-create-app/index.js',
    '../../../packages/eslint-config-create-app/react.js',
  ],
};
