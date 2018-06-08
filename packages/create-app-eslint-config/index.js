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
    '@jakedeichert/create-app-eslint-config/base',
    '@jakedeichert/create-app-eslint-config/react',
  ],
};
