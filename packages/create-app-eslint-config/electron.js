module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  extends: [
    '@jakedeichert/create-app-eslint-config',
    '@jakedeichert/create-app-eslint-config/react',
  ],
};
