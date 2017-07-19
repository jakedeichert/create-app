module.exports = {
  root: true,

  env: {
    mocha: true,
  },

  globals: {
    expect: true, // chai expect
  },

  extends: [
    '../../../packages/eslint-config-create-app/index.js',
    '../../../packages/eslint-config-create-app/react.js',
  ],
};
