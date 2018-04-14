const { EnvironmentPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getEnv } = require('../../utils/helpers');

module.exports = config => {
  config.plugins = [envVariables(), bundleAnalyzer()].filter(v => !!v);
};

const envVariables = () =>
  new EnvironmentPlugin({
    // Used with react-router when serving under a specific directory
    // Example: this example below allows react-router to work with gh-pages since
    // repo sites are prefixed with their name...
    //
    // BASE_URL: 'react-starter' is needed for https://jakedeichert.github.io/react-starter/
    BASE_URL: '',

    // Useful to specify a type of build. Example: static
    BUILD_TYPE: false,
  });

// https://github.com/webpack-contrib/webpack-bundle-analyzer
const bundleAnalyzer = () =>
  getEnv('build', 'info') && new BundleAnalyzerPlugin();
