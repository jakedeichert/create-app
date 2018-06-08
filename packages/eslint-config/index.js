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
    '@jakedeichert/eslint-config-create-app/base',
    '@jakedeichert/eslint-config-create-app/react',
  ],
};
