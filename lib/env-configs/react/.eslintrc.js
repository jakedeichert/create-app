module.exports = {
  root: true,

  env: {
    browser: true,
  },

  globals: {
    // Allow process.env.NODE_ENV
    process: true,
  },

  extends: [
    '../../../packages/eslint-config-create-app/index.js',
    '../../../packages/eslint-config-create-app/react.js',
  ],
};
