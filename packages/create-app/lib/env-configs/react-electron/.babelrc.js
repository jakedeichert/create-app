module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'electron',
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    '@babel/plugin-transform-runtime',
  ],
};
