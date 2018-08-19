const { EnvironmentPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getEnv } = require('../../utils/helpers');

module.exports = config => {
  config.plugins = [
    envVariables(),
    htmlTemplateFile(),
    bundleAnalyzer(),
  ].filter(v => !!v);
};

const envVariables = () =>
  new EnvironmentPlugin({
    // Used with react-router when serving under a specific directory
    // Example: this example below allows react-router to work with gh-pages since
    // repo sites are prefixed with their name...
    BASE_PATH: '',

    // Useful to specify a type of build. Example: static
    BUILD_TYPE: false,
  });

// https://github.com/webpack-contrib/webpack-bundle-analyzer
const bundleAnalyzer = () =>
  getEnv('build', 'info') && new BundleAnalyzerPlugin();

// https://github.com/jantimon/html-webpack-plugin
const htmlTemplateFile = () =>
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  });
