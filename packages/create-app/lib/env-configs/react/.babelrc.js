module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    '@babel/plugin-transform-runtime',
  ],
  env: {
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['> 1%', 'not ie < 12'],
            },
            modules: false,
          },
        ],
      ],
      plugins: [
        // https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
        [
          'babel-plugin-transform-react-remove-prop-types',
          {
            removeImport: true,
          },
        ],
        // https://babeljs.io/docs/plugins/transform-react-constant-elements/
        '@babel/plugin-transform-react-constant-elements',
        // This plugin seems to bloat the app bundle in react-starter
        // Maybe this plugin benefits larger apps?
        // https://babeljs.io/docs/plugins/transform-react-inline-elements/
        // "transform-react-inline-elements"
      ],
    },
  },
};
